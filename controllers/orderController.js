
const Order = require("../models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// 1. Create a new order
const createOrder = async (req, res) => {
    const updatedProducts = [];

    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });
        }

        // Validate and combine duplicate product IDs
        const quantities = new Map();

        for (const item of items) {
            if (
                !item.productId ||
                !mongoose.isValidObjectId(item.productId) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order items"
                });
            }

            const id = item.productId.toString();
            quantities.set(id, (quantities.get(id) || 0) + item.quantity);
        }

        const productIds = [...quantities.keys()];
        const products = await Product.find({
            _id: { $in: productIds }
        });

        if (products.length !== productIds.length) {
            return res.status(404).json({
                success: false,
                message: "One or more products were not found"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        // Check stock and calculate total using database prices
        for (const product of products) {
            const quantity = quantities.get(product._id.toString());

            if (!product.isAvailable || product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is unavailable or has insufficient stock`
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity
            });

            totalAmount += product.price * quantity;
        }

        // Reduce stock safely
        for (const item of orderItems) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: item.product,
                    stock: { $gte: item.quantity },
                    isAvailable: true
                },
                {
                    $inc: { stock: -item.quantity }
                },
                { new: true }
            );

            if (!updatedProduct) {
                throw new Error(
                    `Insufficient stock for ${item.name}. Please try again.`
                );
            }

            updatedProducts.push(item);
        }

        // Save order in MongoDB
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        // Restore stock if order creation fails
        for (const item of updatedProducts) {
            try {
                await Product.updateOne(
                    { _id: item.product },
                    { $inc: { stock: item.quantity } }
                );
            } catch (rollbackError) {
                console.error("Stock rollback failed:", rollbackError.message);
            }
        }

        console.error("Create order error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Failed to place order"
        });
    }
};

// 2. Get logged-in customer's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get my orders error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch your orders"
        });
    }
};

// 3. Admin: Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Get all orders error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};

// 4. Admin: Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Update order status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update order status"
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};

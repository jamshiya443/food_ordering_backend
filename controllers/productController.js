
const Product = require("../models/Product");

// 1. Create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
};

// 2. Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

// 3. Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
};

// 4. Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Update product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update product"
        });
    }
};

// 5. Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete product"
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

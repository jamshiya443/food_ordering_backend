
const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// Get all products
router.get("/", getAllProducts);

// Get single product
router.get("/:id", getProductById);

// Create product (Admin only)
router.post("/", protect, admin, createProduct);

// Update product (Admin only)
router.put("/:id", protect, admin, updateProduct);

// Delete product (Admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;

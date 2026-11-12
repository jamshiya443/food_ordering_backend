
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const { protect, admin } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Food Ordering API is running!"
    });
});

// Protected Test Route
app.get("/api/auth/profile", protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Access granted!",
        user: req.user
    });
});

// Admin Test Route
app.get("/api/admin/test", protect, admin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin!"
    });
});

// Connect Database and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

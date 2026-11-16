
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const { protect, admin } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

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

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
        process.exit(1);
    });

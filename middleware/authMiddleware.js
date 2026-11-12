const jwt = require("jsonwebtoken");

// Protect Routes
const protect = (req, res, next) => {
    try {
        // Get token from request headers
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user information in request
        req.user = decoded;

        // Allow request to continue
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. Invalid or expired token."
        });
    }
};

// Check Admin Role
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin only."
        });
    }
};

module.exports = { protect, admin };
const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Admin token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
        req.admin = decoded; // Inject admin data
        next();
    } catch (err) {
        console.error("❌ Admin token error:", err.message);
        res.status(401).json({ message: "Invalid or expired admin token" });
    }
};

module.exports = authenticateAdmin;

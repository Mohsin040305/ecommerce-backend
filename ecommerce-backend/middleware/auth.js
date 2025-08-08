const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

const adminOnly = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error("Admin access only");
    }
};

module.exports = { protect, adminOnly};
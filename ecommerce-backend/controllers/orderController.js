const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const placeOrder = asyncHandler(async (req, res) => {
    const { orderItems, totalAmount, shippingAddress } = req.body;
    if (!orderItems || !totalAmount || !shippingAddress) {
        res.status(400).json({
            message: "All fields are mandatory"
        })
    }
    if (req.user && req.user.isAdmin) {
        res.status(400).json({
            message: "Admin cannot order"
        })
    }
    const order = await Order.create({
        user: req.user.id,
        orderItems,
        totalAmount,
        shippingAddress,
        status: "Processing"
    });
    res.status(200).json({
        message: "order created succesfully",
        order,
    });
});

const getorders = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }
    let orders;
    if (req.user.isAdmin) {
        const adminProducts = await Product.find({ user_id: req.user.id });
        const adminProductsIds = adminProducts.map(p => p._id);

        orders = await Order.find({ 'orderItems.product': { $in: adminProductsIds } }).populate('user', 'name email').populate('orderItems.product');
    } else {
        orders = await Order.find({ user: req.user.id });
    }

    res.status(200).json(orders);
});



const updateorder = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "please add the status",
        });
    }

    const updatedorder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!updatedorder) {
        return res.status(404).json({
            message: "Order not found",
        });
    }

    res.status(200).json({
        message: "Order updated successfully",
        updatedorder,
    });
});



module.exports = {
    placeOrder,
    getorders,
    updateorder
}
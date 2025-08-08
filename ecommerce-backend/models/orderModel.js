const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
         name: { type: String, required: true},
         quantity: {type: Number, required: true},
         price: { type: Number, required: true},
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
         }
    }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String, 
            required: true
        }
    },
    status: {
        type: String,
        default: "Processing",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema)
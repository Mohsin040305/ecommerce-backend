const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema);
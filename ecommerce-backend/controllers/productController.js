const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;

    if (!name || !description || !price || !stock || !imageUrl) {
        res.status(400).json({
            message: "All fields are mandatory"
        })
    }
    const product = await Product.create({
        user_id: req.user.id,
        name,
        description,
        price,
        stock,
        imageUrl,
    },);
    res.status(200).json(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
    let products;
    if (req.user && req.user.isAdmin) {
        products = await Product.find({ user_id: req.user.id });
    } else {
        products = await Product.find({});
    }
    res.status(200).json(products);
})

const getProductById = asyncHandler(async (req, res) => {
    const product_id = req.params.id;
    if (!product_id) {
        res.status(400);
        throw new Error("please add product id");
    }
    const product = await Product.findById(product_id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
    const product_id = req.params.id;
    if (!product_id) {
        res.status(400);
        throw new Error("please add product id");
    }
    const product = await Product.findById(product_id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    const { name, description, price, stock, imageUrl } = req.body;

    if (!name || !description || !price || !stock || !imageUrl) {
        res.status(400).json({
            message: "All fields are mandatory"
        })
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        product_id,
        {
            user_id: req.user.id,
            name,
            description,
            price,
            stock,
            imageUrl
        },
        { new: true } // returns the updated product
    );
    res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product_id = req.params.id;
    if (!product_id) {
        res.status(400);
        throw new Error("please add product id");
    }
    const product = await Product.findById(product_id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await Product.deleteOne();
    res.status(200).json({
        message: "product deleted successfully",
        deletedProduct: product
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
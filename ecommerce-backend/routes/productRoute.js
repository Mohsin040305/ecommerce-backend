const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { adminOnly, protect } = require("../middleware/auth");
const router = express.Router();

// Public or authenticated access
router.get("/", protect,getAllProducts);
router.get("/:id",protect, getProductById);

// Admin-only routes
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;

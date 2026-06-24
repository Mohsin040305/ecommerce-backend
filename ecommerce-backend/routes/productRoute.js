const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { adminOnly, protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();
const {optionalProtect} = require("../middleware/optionalProtect")

// Public or authenticated access
router.get("/",optionalProtect,getAllProducts);
router.get("/:id",protect, getProductById);

// Admin-only routes
router.post("/",upload.single("image"), protect, adminOnly, createProduct);
router.put("/:id",upload.single("image"), protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;

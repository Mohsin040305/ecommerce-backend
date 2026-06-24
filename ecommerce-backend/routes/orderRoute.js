const express = require("express");
const { placeOrder, getorders, updateorder} = require("../controllers/orderController");
const { protect,adminOnly } = require("../middleware/auth");
const { updateProduct } = require("../controllers/productController");


const router = express.Router();

router.route("/").post(protect,placeOrder).get(protect, getorders);
router.route("/:id").put(protect, adminOnly, updateorder);


module.exports = router;
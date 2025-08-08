const express = require("express");
const { signIn, login } = require("../controllers/userController");
const router = express.Router();

router.route("/signIn").post(signIn);
router.route("/login").post(login);

module.exports = router;
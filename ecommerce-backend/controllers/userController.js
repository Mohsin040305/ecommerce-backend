const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const genrateToken = require("../middleware/tokenGenerate");

const signIn = asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password, isAdmin} = req.body;
    console.log("Request Body:", req.body);
    if (!name || !phoneNumber || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    };
    const userExist = await User.findOne({ email })
    if (userExist){
        res.status(400);
        throw new Error("User already exist with this email");
    };
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        phoneNumber,
        email,
        password: hashedPassword,
        isAdmin
    })
    res.status(200).json( user );
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if ( !email || !password ) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    };
     const user = await User.findOne({ email });

     if (user && (await bcrypt.compare(password , user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user._id)
        });
     } else {
        res.status(401);
        throw new Error("Incorrect email or password");
     }
});

module.exports = {
    signIn,
    login,
}
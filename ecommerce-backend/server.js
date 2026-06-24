const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute")

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/orders", orderRoutes);

const port =  process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});
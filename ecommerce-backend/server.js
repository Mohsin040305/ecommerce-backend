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

const cors = require("cors");
app.use(cors({
  origin: "https://ecommerce-frontend-ev3j.onrender.com/", // set after frontend deploys
  credentials: true
}));

app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/orders", orderRoutes);

const port =  process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});
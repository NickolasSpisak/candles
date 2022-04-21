const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db.js");
const authRoutes = require("./routes/auth.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require('./routes/product.js')
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
const port = process.env.PORT || 5000;

connectDB();
app.listen(port, () => console.log(`Listening on port ${port}`));

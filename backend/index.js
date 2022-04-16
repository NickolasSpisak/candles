import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    mongoose.connect("", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connection success");
  } catch (err) {
    console.log(err);
  }
};
connectDB();
appendFile.listen(port, () => console.log(`Listening on port ${port}`));

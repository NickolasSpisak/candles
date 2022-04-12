import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

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

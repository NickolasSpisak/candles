import mongoose from "mongoose";
import express from "express";

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

import express from "express";
import { categoryController } from "../controller/category.js";
const router = express.Router();

router.post("/", categoryController);

module.exports = router;

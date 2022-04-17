import express from "express";
import { categoryController } from "../controller/category.js";
import { authenticateJWT } from "../middleware/authenticator.js";
const router = express.Router();

router.post("/", authenticateJWT, categoryController.create);

module.exports = router;

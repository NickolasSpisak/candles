import express from "express";
import { signupValidator, validatorResult } from "../middleware/validator.js";
import { signupController } from "../controller/auth.js";
const router = express.Router();

router.post("/signup", signupValidator, validatorResult, signupController);

module.exports = router;

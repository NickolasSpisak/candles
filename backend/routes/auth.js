import express from "express";
import {
  signupValidator,
  validatorResult,
  signinValidator,
} from "../middleware/validator.js";
import { signupController, signinController } from "../controller/auth.js";
const router = express.Router();

router.post("/signup", signupValidator, validatorResult, signupController);
router.post("/signin", signinValidator, validatorResult, signinController);

module.exports = router;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = require("../models/User");
import {jwtSecret, jwtExpire} from "../controller/keys.js"
exports.signupController = (req, res) => {
  const { username, email, password } = req.body;
  try {
      const user = await User.findOne({email})
      if(user) {
          return res.status(400).json({
              errorMessage: 'Email already exists'
          })
      }
      const newUser = new User();
      newUser.username = username
      newUser.email = email
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt)
      await newUser.save();
      res.json({
          successMessage: 'Registration success. Please signin'
      })
  } catch (err) {
    console.log("signup controller error:", err);
    res.status(500).json({
        errorMessage: 'Server error'
    })
  }
};

exports.signinController = (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email})
        if(!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: "Invalid credentials"
            })
        }
        const payload = {
            user: {
                _id: user._id,
            },
        };
        jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token)=> {
            if (err) console.log('jwt err:', err)
            const {_id, username, email, role} = user
            res.json({
                token,
                user: {_id, username, email, role}
            })
        })
    } catch (err) {
        console.log("Signin controller", err)
        res.status(500).json({
            errorMessage: 'Server error'
        })
    }
  };
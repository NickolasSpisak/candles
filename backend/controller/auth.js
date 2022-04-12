import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = require("../models/User");

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
        const isMatch = await bcrypt.compare(password, user.email)
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
        
    } catch (err) {
        console.log("Signin controller", err)
        res.status(500).json({
            errorMessage: 'Server error'
        })
    }
  };
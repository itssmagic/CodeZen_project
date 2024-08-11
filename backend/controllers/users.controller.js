const express = require("express");
// const app = express();
const User = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
dotenv.config();

// Middleware
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      return res.status(400).send("Please enter all data fields!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists!");
    }

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "You are successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Please enter all required fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Password is incorrect");
    }

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure:true
    };

    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in!",
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure:true
  };

  res.status(200).cookie("token", null, options).json({
    message: "You have successfully logged out!",
    success: true,
  });

};



const userInfo = async (req, res) => {
  try {
    // Verifying the JWT from the cookies
 
    const data = jwt.verify(req?.cookies?.token, process.env.SECRET_KEY);
    const user=await User.findById(data.id).select("-password")
    // Logging the decoded data
    console.log(user);
    
    // Returning the decoded data as a JSON response
    return res.json(user);
  } catch (error) {
    // Logging the error before returning the response
    console.log(error);

    // Returning a 401 status with an error message
    return res.status(401).json("Unverified JWT Found");
  }
};
module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userInfo
};

const express = require("express");
const app = express();
const User = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

//middle wares
app.use(cors());
app.use(cookieParser());


const userRegister = async (req, res) => {
  try {
    //get all data from req body
    const { firstname, lastname, email, password } = req.body;

    //check if all data fields are filled
    if (!(firstname && lastname && email && password)) {
      return res.status(400).send("Please enter all data fields!");
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists!");
    }

    //encrypt the password
    const hashPassword = bcrypt.hashSync(password, 8);

    //save the user to the database
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    //generate token for user and send it
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;
    res.status(201).json({
      message: "you are successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    //get all the data from body
    const { email, password } = req.body;

    //check all the data should exist
    if (!(email && password)) {
      res.status(400).send("Please enter all required fields");
    }

    //find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    //match the password=
    const hashPassword = bcrypt.hashSync(password, 8);
    const enteredPassword = await bcrypt.compareSync(password, hashPassword);
    if (!enteredPassword) {
      return res.status(401).send("Password is incorrect");
    }

    //generate token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    user.password = undefined;

    //store cookies
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //only manipulate by server not by client/user
    };

    //send token to user
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};

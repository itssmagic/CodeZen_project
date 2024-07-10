const express = require('express');
const app = express();
const { DBConnection } = require('./database/db');
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

DBConnection();
//server
app.post("/register", async (req, body) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("please fill all the details!");
        }

        //check if user all ready exists
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
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "you are successfully registered",
            user
        });

    }

    catch (error) {


    }
});

//server
app.listen(8000, () => {
    console.log("Server is listening to port 8000");
});
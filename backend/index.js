const express = require('express');
const app = express();

//server
app.post("/register",(req,body) => {
    try {
        
    } catch (error) {
        const {firstname, lastname, email, password} = req.body;

        if(!(firstname && lastname && email && password))
        {
            return res.status(400).send("please fill all the details!");
        }

        //check if user all ready exists
        
    }
  });

//server
app.listen(8000,() => {
  console.log("Server is listening to port 8000");
});
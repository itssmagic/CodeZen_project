const User = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authorizeUser=async (req,res,next)=>{
    try {
        // Verifying the JWT from the cookies
     
        const data = jwt.verify(req?.cookies?.token, process.env.SECRET_KEY);

        const user=await User.findById(data.id).select("-password")
        // Logging the decoded data
        
        req.user=user;
        // Returning the decoded data as a JSON response
        next()
      } catch (error) {
        // Logging the error before returning the response
        console.log(error);
    
        // Returning a 401 status with an error message
        return res.status(401).json("Unverified JWT Found");
      }
}

module.exports={authorizeUser}
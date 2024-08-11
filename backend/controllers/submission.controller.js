// In submissionController.js
const Submission = require("../models/submission.model.js");
const Problem = require("../models/problem.model.js");
const User = require("../models/Users.js");
// controllers/compileController.js
const axios = require("axios");



// Controller function to handle code compilation
const compileCode = async ( code,language,input) => {
 

  try {
    // Forward the code to the compiler service
    const response = await axios.post("http://localhost:5000/run", {
      language,
      input,
      code,
    });
  // console.log("response", response);
    // Return the compiler response
   return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error compiling code:", error.message);
    return { error: "Error compiling code" };
  }
};



const submitCode = async (req, res) => {
  
  const { problemId, code, language } = req.body;
//   console.log("Request Body:", req.body);
  // Validate the request
  if (!problemId || !code || !language ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch the problem and its test cases
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
     

    let status = "Accepted";
    let outputs = [];

    // Run the code against each test case
     for (const testCase of problem.testCases) {
     
      const result = await compileCode(code, language, testCase.input);
      
      outputs.push(result.output);
         console.log("result.output", result.output)
         console.log("testcase.output", testCase.expectedOutput)
      if (result.output.trim() !== testCase.expectedOutput.trim()) {
        status = "Wrong Answer";
         break;
      }
     }
   
    
    
     console.log(req.user);
    // Create a new submission record
    const newSubmission = new Submission({
      userId:req?.user?._id,
      problemId,
      code,
      language,
      status,
      output: outputs.join("\n"),
    });

    console.log(newSubmission);

    await newSubmission.save();

    res.status(200).json(newSubmission);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the submission" });
  }
};


// Controller function to fetch all submissions
const getSubmissions = async (req, res) => {
  try {
    
    
    let query = {};
    
    if (req?.user?.role!=='admin') {
      query.userId = req.user._id; // Only show the current user's submissions if not admin
    }
    
    const submissions = await Submission.find(query)
      .populate('userId', 'username') // Populate username from User model
      .populate('problemId', 'title'); // Populate problem title from Problem model
    
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  submitCode,
  getSubmissions,

};

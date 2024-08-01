// In submissionController.js
const Submission = require("../models/submission.model.js");
const Problem = require("../models/problem.model.js");
  
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
   console.log("response ", response);
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
  if (!problemId || !code || !language) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch the problem and its test cases
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    // console.log(problem);

    let status = "Accepted";
    let outputs = [];

    // Run the code against each test case
    for (const testCase of problem.testCases) {
        
      
      const result = await compileCode(code, language, testCase.input);

      outputs.push(result.output);
        
      if (result.output.trim() !== testCase.expectedOutput.trim()) {
        status = "Wrong Answer";
        break;
      }
    }

    // Create a new submission record
    const newSubmission = new Submission({
      problemId,
      code,
      language,
      status,
      output: outputs.join("\n"),
    });

    await newSubmission.save();

    res.status(200).json(newSubmission);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the submission" });
  }
};

module.exports = {
  submitCode,
};

const axios = require("axios");

// Controller function to handle code compilation
const compileCode = async (req, res) => {
  const { language, input, code } = req.body;

  try {
    // Forward the code to the compiler service
    const response = await axios.post("http://localhost:5000/run", {
      language,
      input,
      code,
    });

    // Return the compiler response
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error compiling code:", error.message);
    
    // Check if the error is from the compiler service
    if (error.response && error.response.data) {
      const compilerError = error.response.data.error || error.message;
      
      // Check if the error message indicates a timeout due to an infinite loop
      if (compilerError.includes("Execution timed out")) {
        return res.status(400).json({ error: "Execution timed out" });
      }
    }

    // Fallback for other errors
    res.status(500).json({ error: "Error compiling code" });
  }
};

module.exports = {
  compileCode,
};

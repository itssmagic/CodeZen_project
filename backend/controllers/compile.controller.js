// controllers/compileController.js
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
    res.status(500).json({ error: "Error compiling code" });
  }
};

module.exports = {
  compileCode,
};

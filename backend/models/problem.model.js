const mongoose = require("mongoose");
//yeah
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  constraints: { type: String, required: true },
});

module.exports = mongoose.model('Problem', problemSchema);

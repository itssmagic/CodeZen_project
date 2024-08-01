const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  problemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Problem' },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, required: true },
  output: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);

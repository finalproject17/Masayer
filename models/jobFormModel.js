const mongoose = require("mongoose");

const jobFormSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    applicationDate: { type: Date, default: Date.now },
    coverLetter: { type: [String] },
});

module.exports = mongoose.model("jobFormSchema", jobFormSchema);
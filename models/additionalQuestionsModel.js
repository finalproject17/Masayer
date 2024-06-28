const mongoose = require("mongoose");
const additionalQuestions = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "JobModel", required: true },
  FirstQuestion:{type:String },
  SecondQuestion:{type:String },
  ThirdQuestion:{type:String },
  FourthQuestion:{type:String }
});

module.exports = mongoose.model("additionalQuestions", additionalQuestions);

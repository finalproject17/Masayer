const mongoose = require("mongoose");
const appliedJobStatusEnum = ["accepted", "rejected", "pending"];
const AppliedJobsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appliedJobStatus: {
    type: String,
    required: true,
    enum: appliedJobStatusEnum,
    default: "pending",
  },
  FirstAnswer:{type:String },
  SecondAnswer:{type:String },
  thirdAnswer:{type:String },
  FourthAnswer:{type:String },
  timeStamp: {
    type: Date,
  }
});
AppliedJobsSchema.statics.countAppliedJobsByUser = async function(userId) {
  try {
      const count = await this.countDocuments({ userId });
      return count;
  } catch (err) {
      throw err;
  }
};

const AppliedJob = mongoose.model("AppliedJob", AppliedJobsSchema);
module.exports = AppliedJob;

const mongoose = require("mongoose");

const jobFormSchema = new mongoose.Schema({
    jobFormName: { type: String },
    jobFormDetails: { type: String },
    test: String,
});

module.exports = mongoose.model("jobFormSchema", jobFormSchema);
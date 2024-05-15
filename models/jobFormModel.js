const mongoose = require("mongoose");
const jobFormSchema = new mongoose.Schema({
    jobFormName: { type: String },
    jobFormDetails:{type:String},
})

module.exports = mongoose.model("jobFormSchema", jobFormSchema);
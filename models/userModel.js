const mongoose = require("mongoose");

const categoryEnum = ["Programming", "Health Care", "Finance", "Accounting"];
const desiredJobTypesEnum = [
  "Full Time",
  "Part Time",
  "Internship",
  "Freelance",
  "None",
];
const experienceLevelEnum = ["Fresh", "Junior", "Senior", "Expert"];
const currentYear = new Date().getFullYear();
const fromDate = Array.from({ length: currentYear - 1989 }, (_, i) => (1990 + i).toString());
const toDate = [...fromDate, "Present"];

const qualificationsEnum = ["Master's Degree", "Bachelors Degree", "None"];

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, },
  city: { type: String,  },
  country: { type: String, },
  category: { type: String, enum: categoryEnum },
  experienceLevel: { type: String, enum: experienceLevelEnum },
  desiredJobType: { type: String, enum: desiredJobTypesEnum },
  qualifications: { type: String, enum: qualificationsEnum },
  profilePhoto: { type: String },
  skills: [{ type: String }],
  overview: { type: String },
  socialMedia: {
    linkedin: { type: String },
    facebook: { type: String },
  },
  isActive: { type: Boolean, default: true },
  education: {
    title: { type: String },
    academy: { type: String },
    from:{type:String ,enum: fromDate},
    to:{type:String ,enum: toDate},
    description:{type: String}
  },
  workAndExperience: {
    title: { type: String },
    academy: { type: String },
    from:{type:String ,enum: fromDate},
    to:{type:String ,enum: toDate},
    description:{type: String}
  },
  googleId:{type:String}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

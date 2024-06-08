
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyIndustry: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (em) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(em);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    companyLogo: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    companyPassword: {
      type: String,
      required: true,
    },
    companyLocation: {
      state: String,
      city: String,
    },
    companyImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;


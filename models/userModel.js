const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userEmail: {
    type: String,  unique: true, validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,8}(@)(gmail|yahoo|outlook)(.com)$/.test(v);
      },
      message: (props) => {
        console.log(props);
        return `${props.value} is not a valid email!`;
      },
    },
  },
  userPassword: {
    type: String,validate: {
      validator: function (v) {
        return /\d{3}/.test(v);
      },
      message: (props) => {
        console.log(props);
        return `${props.value} is not a valid password!`;
      },
    },
  },
  name: { type: String, required: true },
 },
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

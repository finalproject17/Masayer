
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, userEmail, userPassword } = req.body;
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);
    const user = await User.create({ username, userEmail, userPassword: hashedUserPassword });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userPasswordMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!userPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
    try {
      const userId = req.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports = { registerUser, loginUser, updateUser, deleteUser };
  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');

async function register(req, res) {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    city,
    country,
    category,
    experienceLevel,
    desiredJobType,
    qualifications,
    // profilePhoto
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password);
    const newUser = await usersModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      city,
      country,
      category,
      experienceLevel,
      desiredJobType,
      qualifications,
      // profilePhoto
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await usersModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await usersModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function changeUserActivity(req, res) {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id).select('isActive');
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email Not Found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Email or Password' });

    }
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.firstName + " " + user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  register,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  changeUserActivity,
  login
};

const User = require("../models/user");

// @desc   Get logged in user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc   Get all users
// @route  GET /api/users
// @access Admin
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
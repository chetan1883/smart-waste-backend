const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

router.get("/", authMiddleware, adminOnly, getAllUsers);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);

module.exports = router;
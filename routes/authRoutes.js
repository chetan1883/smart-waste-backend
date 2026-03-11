const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authcontroller");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/admin",
  authMiddleware,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
      user: req.user,
    });
  }
);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  assignComplaint
} = require("../controllers/complaintController");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


// 🟢 Citizen Routes

// Create complaint with image
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// Get logged-in user's complaints
router.get("/my", authMiddleware, getMyComplaints);


// 🔴 Admin Routes

// Get all complaints
//router.get("/", authMiddleware, adminOnly, getAllComplaints);
router.get("/", authMiddleware, getAllComplaints);
// Update complaint status
router.put("/:id/status", authMiddleware, adminOnly, updateComplaintStatus);

// Assign complaint to worker
router.put("/:id/assign", authMiddleware, adminOnly, assignComplaint);


module.exports = router;
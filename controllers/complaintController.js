const Complaint = require("../models/complaint");


// CREATE COMPLAINT
exports.createComplaint = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { description, latitude, longitude } = req.body;

    const complaint = new Complaint({
      user: req.user.id,
      description: description,

      location: {
        latitude: latitude,
        longitude: longitude,
        address: "Not provided"
      },

      image: req.file ? req.file.filename : "",

      status: "Pending"
    });

    const savedComplaint = await complaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      complaint: savedComplaint
    });

  } catch (error) {

    console.error("CREATE COMPLAINT ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};



// GET MY COMPLAINTS
exports.getMyComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find({ user: req.user.id });

    res.json(complaints);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};



// GET ALL COMPLAINTS (ADMIN)
exports.getAllComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find().populate("user", "name email");

    res.json(complaints);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};



// UPDATE COMPLAINT STATUS
exports.updateComplaintStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};



// ASSIGN COMPLAINT
exports.assignComplaint = async (req, res) => {
  try {

    const { workerId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedTo: workerId },
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // 👤 Who created the complaint
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📝 Description of the waste issue
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 📷 Image URL (we will later connect Cloudinary)
    image: {
      type: String,
      default: "",
    },

    // 📍 Location details
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    // 📊 Status tracking
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    // 🏢 Assigned Municipal Officer (Admin)
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
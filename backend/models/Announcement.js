const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    category: {
      type: String,
      enum: ["Announcement", "Advisory", "Event", "Health", "Disaster", "Job"],
      default: "Announcement",
    },
    imageUrl: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);

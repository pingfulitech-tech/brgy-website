const mongoose = require("mongoose");

const officialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    // Lower order number = higher rank (Punong Barangay = 0)
    order: { type: Number, default: 100 },
    committee: { type: String, trim: true, default: "" },
    photoUrl: { type: String, default: "" },
    termStart: { type: String, default: "" },
    termEnd: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Official", officialSchema);

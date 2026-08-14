const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    fee: { type: String, default: "Free" },
    processingTime: { type: String, default: "" },
    icon: { type: String, default: "document" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

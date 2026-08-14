const express = require("express");
const Official = require("../models/Official");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/officials - public, sorted by rank order
router.get("/", async (req, res) => {
  try {
    const officials = await Official.find().sort({ order: 1, name: 1 });
    res.json(officials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch officials.", error: err.message });
  }
});

// POST /api/officials - admin only
router.post("/", requireAuth, async (req, res) => {
  try {
    const official = await Official.create(req.body);
    res.status(201).json(official);
  } catch (err) {
    res.status(400).json({ message: "Failed to create official.", error: err.message });
  }
});

// PUT /api/officials/:id - admin only
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const official = await Official.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!official) return res.status(404).json({ message: "Official not found." });
    res.json(official);
  } catch (err) {
    res.status(400).json({ message: "Failed to update official.", error: err.message });
  }
});

// DELETE /api/officials/:id - admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const official = await Official.findByIdAndDelete(req.params.id);
    if (!official) return res.status(404).json({ message: "Official not found." });
    res.json({ message: "Official removed." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete official.", error: err.message });
  }
});

module.exports = router;

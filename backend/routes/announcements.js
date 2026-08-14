const express = require("express");
const Announcement = require("../models/Announcement");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/announcements - public, pinned first then newest
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ isPinned: -1, publishedAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements.", error: err.message });
  }
});

// GET /api/announcements/:id - public
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcement.", error: err.message });
  }
});

// POST /api/announcements - admin only
router.post("/", requireAuth, async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: "Failed to create announcement.", error: err.message });
  }
});

// PUT /api/announcements/:id - admin only
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ message: "Failed to update announcement.", error: err.message });
  }
});

// DELETE /api/announcements/:id - admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });
    res.json({ message: "Announcement removed." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete announcement.", error: err.message });
  }
});

module.exports = router;

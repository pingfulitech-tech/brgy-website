const express = require("express");
const Contact = require("../models/Contact");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// POST /api/contact - public, residents submit inquiries
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Name, email, subject, and message are required." });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message sent. The barangay office will get back to you.", contact });
  } catch (err) {
    res.status(400).json({ message: "Failed to send message.", error: err.message });
  }
});

// GET /api/contact - admin only, view inbox
router.get("/", requireAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages.", error: err.message });
  }
});

// PUT /api/contact/:id - admin only, update status
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: "Message not found." });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: "Failed to update message.", error: err.message });
  }
});

module.exports = router;

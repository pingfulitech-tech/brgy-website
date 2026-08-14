const express = require("express");
const Service = require("../models/Service");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/services - public
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services.", error: err.message });
  }
});

// POST /api/services - admin only
router.post("/", requireAuth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: "Failed to create service.", error: err.message });
  }
});

// PUT /api/services/:id - admin only
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: "Service not found." });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: "Failed to update service.", error: err.message });
  }
});

// DELETE /api/services/:id - admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found." });
    res.json({ message: "Service removed." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service.", error: err.message });
  }
});

module.exports = router;

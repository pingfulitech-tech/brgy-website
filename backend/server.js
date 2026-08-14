require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const officialsRoutes = require("./routes/officials");
const announcementsRoutes = require("./routes/announcements");
const servicesRoutes = require("./routes/services");
const contactRoutes = require("./routes/contact");

const app = express();

// Middleware
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Barangay API is running.",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/officials", officialsRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong on the server.",
  });
});

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Barangay API listening on port ${PORT}`);
});

// Connect to MongoDB
connectDB();
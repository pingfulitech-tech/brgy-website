import { useEffect, useState } from "react";
import api from "../api/axios.js";
import AnnouncementCard from "../components/AnnouncementCard.jsx";

const categories = ["All", "Announcement", "Advisory", "Event", "Health", "Disaster", "Job"];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch(() => setError("Could not load announcements right now."))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All" ? announcements : announcements.filter((a) => a.category === filter);

  return (
    <div className="container section">
      <span className="eyebrow">Stay Informed</span>
      <h1>Announcements</h1>
      <p className="lead">Advisories, events, and updates from the barangay office.</p>

      <div className="filter-row">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${filter === c ? "is-active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="muted">Loading announcements…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="muted">No announcements in this category yet.</p>
      )}

      <div className="grid grid-3">
        {filtered.map((a) => (
          <AnnouncementCard key={a._id} announcement={a} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Seal from "../components/Seal.jsx";
import AnnouncementCard from "../components/AnnouncementCard.jsx";
import ServiceDashboard from "../components/ServiceDashboard.jsx";
import AssistanceGrid from "../components/AssistanceGrid.jsx";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/announcements")
      .then((res) => setAnnouncements(res.data.slice(0, 3)))
      .catch(() => setError("Could not load announcements right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Official Web Portal</span>
            <h1>
              Serving Barangay <span>Dita</span>, one resident at a time.
            </h1>
            <p>
              Request documents, stay updated on community advisories, and reach your
              barangay officials — all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-gold">Request a Document</Link>
              <Link to="/contact" className="btn btn-outline">Report a Concern</Link>
            </div>
          </div>
          <div className="hero-seal" aria-hidden="true">
            <Seal size={220} />
          </div>
        </div>
      </section>

      <section className="ticker">
        <div className="container ticker-inner">
          <div className="ticker-item">
            <span className="ticker-label">Office Hours</span>
            <span>Mon–Fri, 8:00 AM – 5:00 PM</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-label">Emergency Hotline</span>
            <span>0917-000-0001</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-label">Barangay Captain</span>
            <span>Hon. Juan Dela Cruz</span>
          </div>
        </div>
      </section>

      <ServiceDashboard />

      <section className="container section">
        <div className="section-head">
          <h2>Latest Announcements</h2>
          <Link to="/announcements" className="link-more">View all &rarr;</Link>
        </div>

        {loading && <p className="muted">Loading announcements…</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && announcements.length === 0 && (
          <p className="muted">No announcements posted yet.</p>
        )}

        <div className="grid grid-3">
          {announcements.map((a) => (
            <AnnouncementCard key={a._id} announcement={a} />
          ))}
        </div>
      </section>

      <AssistanceGrid />
    </div>
  );
}

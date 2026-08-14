import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/announcements/${id}`)
      .then((res) => setAnnouncement(res.data))
      .catch(() => setError("This announcement could not be found."));
  }, [id]);

  if (error) {
    return (
      <div className="container section page-narrow">
        <p className="error-text">{error}</p>
        <Link to="/announcements" className="link-more">&larr; Back to announcements</Link>
      </div>
    );
  }

  if (!announcement) {
    return <div className="container section"><p className="muted">Loading…</p></div>;
  }

  return (
    <div className="container section page-narrow">
      <Link to="/announcements" className="link-more">&larr; Back to announcements</Link>
      <span className={`a-card-tag tag-${announcement.category.toLowerCase()}`}>
        {announcement.category}
      </span>
      <h1>{announcement.title}</h1>
      <time className="muted">{formatDate(announcement.publishedAt)}</time>
      <div className="announcement-body">
        {announcement.body.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

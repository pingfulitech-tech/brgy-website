import { Link } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AnnouncementCard({ announcement }) {
  const { _id, title, body, category, isPinned, publishedAt } = announcement;
  const excerpt = body.length > 140 ? body.slice(0, 140).trim() + "…" : body;

  return (
    <Link to={`/announcements/${_id}`} className="a-card">
      {isPinned && <span className="a-card-pin">Pinned</span>}
      <span className={`a-card-tag tag-${category.toLowerCase()}`}>{category}</span>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <time>{formatDate(publishedAt)}</time>
    </Link>
  );
}

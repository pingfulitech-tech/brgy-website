import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

// Curated categories for the homepage "Online Services" dashboard.
// This is presentation data (icons + groupings), separate from the full
// service records fetched from the API and shown in detail on /services.
const categories = [
  {
    title: "Documents & Clearances",
    items: [
      { label: "Barangay Clearance", icon: "document" },
      { label: "Certificate of Indigency", icon: "heart" },
      { label: "Community Tax Certificate", icon: "id" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Business Permit Clearance", icon: "briefcase" },
    ],
  },
  {
    title: "Peace & Order",
    items: [
      { label: "Barangay Protection Order", icon: "shield" },
      { label: "Lupon (Barangay Justice)", icon: "scale" },
    ],
  },
];

const initialCount = 2;

export default function ServiceDashboard() {
  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? categories : categories.slice(0, initialCount);

  return (
    <section className="container section services-dashboard">
      <div className="section-head">
        <div>
          <span className="eyebrow">Barangay eServices</span>
          <h2>Online Services</h2>
        </div>
      </div>

      <div className="dashboard-groups">
        {visibleCategories.map((group) => (
          <div className="dashboard-group" key={group.title}>
            <h3 className="dashboard-group-title">{group.title}</h3>
            <div className="dashboard-tiles">
              {group.items.map((item) => (
                <Link to="/services" className="dashboard-tile" key={item.label}>
                  <span className="dashboard-tile-icon"><Icon name={item.icon} /></span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-toggle" onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Show Less ▲" : "View All Services ▼"}
      </button>
    </section>
  );
}

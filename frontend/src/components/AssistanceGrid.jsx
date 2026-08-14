import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

const actions = [
  {
    icon: "chat",
    title: "Ask for Assistance",
    body: "Need help with barangay services or community concerns? Submit a request and our team will assist you.",
    cta: "Request Now",
    subject: "Request for Assistance",
  },
  {
    icon: "flag",
    title: "Report a Concern",
    body: "Report issues involving roads, sanitation, noise, disputes, or other community concerns.",
    cta: "Report Now",
    subject: "Report a Concern",
  },
  {
    icon: "heart",
    title: "Share Feedback",
    body: "Share your suggestions, comments, or experiences to help us improve barangay services.",
    cta: "Share Now",
    subject: "Feedback",
  },
  {
    icon: "info",
    title: "Access Information",
    body: "Request public documents, barangay records, or general information from the office.",
    cta: "Access Now",
    subject: "Request for Information",
  },
];

export default function AssistanceGrid() {
  return (
    <section className="assistance-section">
      <div className="container">
        <span className="eyebrow eyebrow-on-navy">One Barangay. One Community.</span>
        <div className="grid grid-4 assistance-grid">
          {actions.map((a) => (
            <div className="assistance-card" key={a.title}>
              <span className="assistance-icon"><Icon name={a.icon} size={26} /></span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <Link to={`/contact?subject=${encodeURIComponent(a.subject)}`} className="assistance-link">
                {a.cta} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

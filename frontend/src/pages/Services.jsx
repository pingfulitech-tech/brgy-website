import { useEffect, useState } from "react";
import api from "../api/axios.js";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data))
      .catch(() => setError("Could not load services right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container section">
      <span className="eyebrow">Barangay Services</span>
      <h1>Documents &amp; Services</h1>
      <p className="lead">
        Here's what you need to bring when visiting the barangay hall for common
        transactions.
      </p>

      {loading && <p className="muted">Loading services…</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && services.length === 0 && (
        <p className="muted">No services listed yet.</p>
      )}

      <div className="grid grid-3">
        {services.map((s) => (
          <ServiceCard key={s._id} service={s} />
        ))}
      </div>
    </div>
  );
}

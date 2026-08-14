import { useEffect, useState } from "react";
import api from "../api/axios.js";
import OfficialCard from "../components/OfficialCard.jsx";

export default function Officials() {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/officials")
      .then((res) => setOfficials(res.data))
      .catch(() => setError("Could not load officials right now."))
      .finally(() => setLoading(false));
  }, []);

  const captain = officials.find((o) => o.position === "Punong Barangay");
  const rest = officials.filter((o) => o.position !== "Punong Barangay");

  return (
    <div className="container section">
      <span className="eyebrow">Barangay Council</span>
      <h1>Our Officials</h1>
      <p className="lead">
        Meet the elected and appointed officials serving Barangay Dita for the
        current term.
      </p>

      {loading && <p className="muted">Loading officials…</p>}
      {error && <p className="error-text">{error}</p>}

      {captain && (
        <div className="captain-spotlight">
          <OfficialCard official={captain} />
        </div>
      )}

      <div className="grid grid-4">
        {rest.map((official) => (
          <OfficialCard key={official._id} official={official} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const TABS = ["Announcements", "Officials", "Services", "Messages"];

export default function Dashboard() {
  const [tab, setTab] = useState("Announcements");
  const navigate = useNavigate();
  const adminName = localStorage.getItem("brgy_admin_name") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("brgy_admin_token");
    localStorage.removeItem("brgy_admin_name");
    navigate("/admin/login");
  };

  return (
    <div className="container section">
      <div className="dashboard-head">
        <div>
          <span className="eyebrow">Content Management</span>
          <h1>Welcome, {adminName}</h1>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="filter-row">
        {TABS.map((t) => (
          <button
            key={t}
            className={`filter-chip ${tab === t ? "is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Announcements" && <AnnouncementsPanel />}
      {tab === "Officials" && <OfficialsPanel />}
      {tab === "Services" && <ServicesPanel />}
      {tab === "Messages" && <MessagesPanel />}
    </div>
  );
}

/* ---------------- Announcements ---------------- */
function AnnouncementsPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", category: "Announcement", isPinned: false });
  const [error, setError] = useState("");

  const load = () => api.get("/announcements").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/announcements", form);
      setForm({ title: "", body: "", category: "Announcement", isPinned: false });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post announcement.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    await api.delete(`/announcements/${id}`);
    load();
  };

  return (
    <div className="admin-panel">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>New Announcement</h2>
        <label>
          Title
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </label>
        <label>
          Category
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {["Announcement", "Advisory", "Event", "Health", "Disaster", "Job"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Body
          <textarea rows="4" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.isPinned}
            onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
          />
          Pin to top
        </label>
        <button type="submit" className="btn btn-gold">Publish</button>
        {error && <p className="error-text">{error}</p>}
      </form>

      <div className="admin-list">
        <h2>Published ({items.length})</h2>
        {items.map((a) => (
          <div className="admin-list-item" key={a._id}>
            <div>
              <strong>{a.title}</strong>
              <span className="muted"> — {a.category}{a.isPinned ? " · Pinned" : ""}</span>
            </div>
            <button className="btn-link-danger" onClick={() => handleDelete(a._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Officials ---------------- */
function OfficialsPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", committee: "", order: 10 });
  const [error, setError] = useState("");

  const load = () => api.get("/officials").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/officials", form);
      setForm({ name: "", position: "", committee: "", order: 10 });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add official.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this official?")) return;
    await api.delete(`/officials/${id}`);
    load();
  };

  return (
    <div className="admin-panel">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add Official</h2>
        <label>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label>
          Position
          <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
        </label>
        <label>
          Committee (optional)
          <input value={form.committee} onChange={(e) => setForm({ ...form, committee: e.target.value })} />
        </label>
        <label>
          Display Order (0 = highest rank)
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </label>
        <button type="submit" className="btn btn-gold">Add Official</button>
        {error && <p className="error-text">{error}</p>}
      </form>

      <div className="admin-list">
        <h2>Council ({items.length})</h2>
        {items.map((o) => (
          <div className="admin-list-item" key={o._id}>
            <div>
              <strong>{o.name}</strong>
              <span className="muted"> — {o.position}</span>
            </div>
            <button className="btn-link-danger" onClick={() => handleDelete(o._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Services ---------------- */
function ServicesPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", requirements: "", fee: "Free", processingTime: "" });
  const [error, setError] = useState("");

  const load = () => api.get("/services").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/services", {
        ...form,
        requirements: form.requirements.split(",").map((r) => r.trim()).filter(Boolean),
      });
      setForm({ name: "", description: "", requirements: "", fee: "Free", processingTime: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add service.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this service?")) return;
    await api.delete(`/services/${id}`);
    load();
  };

  return (
    <div className="admin-panel">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add Service</h2>
        <label>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label>
          Description
          <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </label>
        <label>
          Requirements (comma-separated)
          <input value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
        </label>
        <label>
          Fee
          <input value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
        </label>
        <label>
          Processing Time
          <input value={form.processingTime} onChange={(e) => setForm({ ...form, processingTime: e.target.value })} />
        </label>
        <button type="submit" className="btn btn-gold">Add Service</button>
        {error && <p className="error-text">{error}</p>}
      </form>

      <div className="admin-list">
        <h2>Services ({items.length})</h2>
        {items.map((s) => (
          <div className="admin-list-item" key={s._id}>
            <div>
              <strong>{s.name}</strong>
              <span className="muted"> — {s.fee}</span>
            </div>
            <button className="btn-link-danger" onClick={() => handleDelete(s._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Messages ---------------- */
function MessagesPanel() {
  const [items, setItems] = useState([]);

  const load = () => api.get("/contact").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/contact/${id}`, { status });
    load();
  };

  return (
    <div className="admin-list full-width">
      <h2>Inbox ({items.length})</h2>
      {items.map((m) => (
        <div className="admin-list-item message-item" key={m._id}>
          <div>
            <strong>{m.subject}</strong>
            <p className="muted">{m.name} · {m.email} {m.contactNumber && `· ${m.contactNumber}`}</p>
            <p>{m.message}</p>
          </div>
          <select value={m.status} onChange={(e) => updateStatus(m._id, e.target.value)}>
            <option value="New">New</option>
            <option value="Read">Read</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ))}
      {items.length === 0 && <p className="muted">No messages yet.</p>}
    </div>
  );
}

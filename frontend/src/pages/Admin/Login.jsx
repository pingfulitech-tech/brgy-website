import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("brgy_admin_token", res.data.token);
      localStorage.setItem("brgy_admin_name", res.data.admin.name);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section page-narrow">
      <span className="eyebrow">Staff Access</span>
      <h1>Admin Login</h1>
      <p className="lead">For barangay officials and staff managing site content.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button type="submit" className="btn btn-gold" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

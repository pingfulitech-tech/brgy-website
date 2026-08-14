import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialForm = {
    name: "",
    email: "",
    contactNumber: "",
    subject: searchParams.get("subject") || "",
    message: "",
  };
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "" });
    try {
      const res = await api.post("/contact", form);
      setStatus({ state: "success", message: res.data.message });
      setForm({ ...initialForm, subject: "", message: "", name: "", email: "", contactNumber: "" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="container section page-narrow">
      <span className="eyebrow">Get in Touch</span>
      <h1>Contact the Barangay Office</h1>
      <p className="lead">
        Send an inquiry, report a concern, or ask about a transaction. We aim to respond
        within 1-2 business days.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email Address
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>

        <label>
          Contact Number
          <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
        </label>

        <label>
          Subject
          <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
        </label>

        <label>
          Message
          <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
        </label>

        <button type="submit" className="btn btn-gold" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send Message"}
        </button>

        {status.state === "success" && <p className="success-text">{status.message}</p>}
        {status.state === "error" && <p className="error-text">{status.message}</p>}
      </form>
    </div>
  );
}

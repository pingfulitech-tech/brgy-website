import { Link } from "react-router-dom";
import Seal from "./Seal.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Seal size={44} />
          <div>
            <p className="footer-title">Barangay Dita</p>
            <p className="footer-sub">City of Santa Rosa, Laguna</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/services">Request a Document</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/officials">Barangay Officials</Link>
          <Link to="/contact">Report a Concern</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Barangay Hall, Purok 3, Dita</p>
          <p>Trunk line: (049) 123-4567</p>
          <p>Email: barangaydita@example.gov.ph</p>
        </div>

        <div className="footer-col">
          <h4>Emergency Hotlines</h4>
          <p>Barangay Tanod: 0917-000-0001</p>
          <p>Health Center: 0917-000-0002</p>
          <p>Fire / Police: 911</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {year} Barangay Dita. All rights reserved.</p>
        <Link to="/admin/login" className="admin-link">Admin</Link>
      </div>
    </footer>
  );
}

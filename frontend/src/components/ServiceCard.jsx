export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p className="service-desc">{service.description}</p>

      {service.requirements?.length > 0 && (
        <div className="service-req">
          <p className="service-req-label">Requirements</p>
          <ul>
            {service.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="service-meta">
        <span><strong>Fee:</strong> {service.fee || "Free"}</span>
        {service.processingTime && <span><strong>Processing:</strong> {service.processingTime}</span>}
      </div>
    </div>
  );
}

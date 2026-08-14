export default function OfficialCard({ official }) {
  const initials = official.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="official-card">
      <div className="official-avatar">
        {official.photoUrl ? (
          <img src={official.photoUrl} alt={official.name} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <h3>{official.name}</h3>
      <p className="official-position">{official.position}</p>
      {official.committee && <p className="official-committee">{official.committee}</p>}
    </div>
  );
}

import { useEffect, useState } from "react";

// Live clock strip, mirroring the "Thursday, August 13, 2026 | 12:53:58 PM"
// header treatment common on LGU/municipal sites.
export default function DateTimeBadge() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="datetime-badge">
      {dateStr} <span className="datetime-sep">|</span> {timeStr} PHT
    </div>
  );
}

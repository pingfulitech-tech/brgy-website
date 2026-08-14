// Minimal inline line-icon set so the services dashboard doesn't depend on
// an external icon library. Add more paths here as new service icons are needed.
const paths = {
  document: "M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M14 2v6h6 M9 13h6 M9 17h6",
  heart: "M12 21s-7.5-4.6-10-9.1C.5 8.2 2.2 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5 17.8 5 19.5 8.2 22 11.9 19.5 16.4 12 21 12 21z",
  briefcase: "M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3 M3 13h18",
  shield: "M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z",
  scale: "M12 3v18 M5 7h14 M12 7l-5 9h10l-5-9z M4 16a2.5 2.5 0 0 0 5 0 M15 16a2.5 2.5 0 0 0 5 0",
  id: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M5.5 16c.5-1.7 1.8-2.5 3.5-2.5s3 .8 3.5 2.5 M15 9h4 M15 13h4",
  chat: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  flag: "M4 22V4 M4 4h14l-3 4 3 4H4",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8v.01 M11 11h1v6h1",
};

export default function Icon({ name = "document", size = 24 }) {
  const d = paths[name] || paths.document;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function About() {
  return (
    <div className="container section page-narrow">
      <span className="eyebrow">About Us</span>
      <h1>Barangay Dita</h1>
      <p className="lead">
        Barangay Dita is a community-driven local government unit committed to
        transparent governance, responsive public service, and the well-being of every
        resident it serves.
      </p>

      <div className="about-grid">
        <div className="about-block">
          <h2>History</h2>
          <p>
            Barangay Dita was founded by early settlers who cultivated the land
            surrounding what is now the barangay center. Named after Dita
            Labrador, the patron saint of farmers, the community has grown from a small
            farming settlement into a thriving residential and commercial area while
            keeping its agricultural roots alive through local festivals and markets.
          </p>
        </div>

        <div className="about-block">
          <h2>Vision</h2>
          <p>
            A safe, progressive, and united barangay where every resident has access to
            quality basic services, opportunities for growth, and a government that
            listens.
          </p>
        </div>

        <div className="about-block">
          <h2>Mission</h2>
          <p>
            To deliver efficient and transparent public service, uphold peace and order,
            protect the environment, and empower residents through inclusive programs
            for health, education, and livelihood.
          </p>
        </div>

        <div className="about-block">
          <h2>Barangay Profile</h2>
          <ul className="profile-list">
            <li><strong>Land Area:</strong> 3.2 sq. km.</li>
            <li><strong>Population:</strong> approx. 12,400 residents</li>
            <li><strong>Number of Puroks:</strong> 7</li>
            <li><strong>Classification:</strong> Urban Barangay</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

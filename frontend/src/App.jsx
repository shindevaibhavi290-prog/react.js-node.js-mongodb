import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();
    const locationText = location.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.skills?.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesLocation =
      job.location?.toLowerCase().includes(locationText);

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Job<span>Finder</span>
        </div>

        <div className="nav-links">
          <a href="#jobs">Find Jobs</a>
          <a href="#companies">Companies</a>
          <a href="#about">About</a>
        </div>

        <button className="post-btn">
          Post a Job
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">
          <p className="small-title">
            YOUR NEXT CAREER STARTS HERE
          </p>

          <h1>
            Find a job that
            <span> fits your life.</span>
          </h1>

          <p className="hero-text">
            Discover exciting opportunities from top companies
            and take the next step in your career.
          </p>

          {/* Search */}
          <div className="search-box">

            <div className="search-field">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Job title, skills or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-field">
              <span>📍</span>

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button className="search-btn">
              Search Jobs
            </button>

          </div>
        </div>

      </section>

      {/* Stats */}
      <section className="stats">

        <div>
          <h2>{jobs.length}+</h2>
          <p>Available Jobs</p>
        </div>

        <div>
          <h2>100+</h2>
          <p>Companies</p>
        </div>

        <div>
          <h2>10K+</h2>
          <p>Job Seekers</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Skills</p>
        </div>

      </section>

      {/* Jobs */}
      <section className="jobs-section" id="jobs">

        <div className="section-heading">
          <div>
            <p className="section-label">OPPORTUNITIES</p>
            <h2>Latest Job Openings</h2>
          </div>

          <span className="job-count">
            {filteredJobs.length} Jobs Found
          </span>
        </div>

        {filteredJobs.length === 0 ? (

          <div className="no-jobs">
            <div className="empty-icon">🔎</div>
            <h3>No jobs found</h3>
            <p>
              Try changing your search or location.
            </p>
          </div>

        ) : (

          <div className="job-grid">

            {filteredJobs.map((job) => (

              <div className="job-card" key={job._id}>

                <div className="job-top">

                  <div className="company-logo">
                    {job.company?.charAt(0).toUpperCase()}
                  </div>

                  <button className="bookmark">
                    ♡
                  </button>

                </div>

                <div className="job-content">

                  <p className="company">
                    {job.company}
                  </p>

                  <h3>{job.title}</h3>

                  <div className="job-info">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💼 {job.jobType}
                    </span>

                  </div>

                  <div className="salary">
                    💰 {job.salary}
                  </div>

                  <p className="experience">
                    Experience: {job.experience}
                  </p>

                  <div className="skills">

                    {job.skills?.map((skill, index) => (
                      <span key={index}>
                        {skill}
                      </span>
                    ))}

                  </div>

                  <p className="description">
                    {job.description}
                  </p>

                  <button className="apply-btn">
                    Apply Now →
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* CTA */}
      <section className="cta" id="about">

        <div>
          <p className="section-label">
            READY FOR YOUR NEXT MOVE?
          </p>

          <h2>
            Your dream job is
            <br />
            waiting for you.
          </h2>

          <p>
            Explore opportunities and build the career
            you always wanted.
          </p>
        </div>

        <button>
          Explore Jobs →
        </button>

      </section>

      {/* Footer */}
      <footer>

        <div className="footer-logo">
          Job<span>Finder</span>
        </div>

        <p>
          Connecting talent with opportunity.
        </p>

        <p className="copyright">
          © 2026 JobFinder. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;

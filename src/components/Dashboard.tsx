import React from 'react';
import './Dashboard.css';

// TypeScript Interfaces for Data
interface StudentData {
  name: string;
  studentId: string;
  email: string;
  branch: string;
  year: string;
  division: string;
  rollNo: string;
}

interface UpcomingEvent {
  id: number;
  month: string;
  date: string;
  title: string;
}

export default function Dashboard(): React.JSX.Element {
  const studentData: StudentData = {
    name: "Name",
    studentId: "DMCE12345",
    email: "dmce12345@gmail.com",
    branch: "Computer Engg",
    year: "2nd Year",
    division: "A",
    rollNo: "63"
  };

  const upcomingEvents: UpcomingEvent[] = [
    { id: 1, month: "JUL", date: "27", title: "E-cell Orientation" },
    { id: 2, month: "AUG", date: "17", title: "Eureka" },
    { id: 3, month: "SEP", date: "14", title: "Hackathon" }
  ];

  return (
    <div className="dashboard-page">

      {/* Dynamic Background Glows & Floating Particles */}
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>
      <div className="background-glow glow-three"></div>

      <div className="floating-dot dot-one"></div>
      <div className="floating-dot dot-two"></div>
      <div className="floating-dot dot-three"></div>

      {/* Dynamic Sticky Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          <div className="logo-symbol">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-name">
            <strong>ECELL</strong>
            <small>D M C E</small>
          </div>
        </div>

        <div className="dashboard-nav-links">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT US</a>
          <a href="#event">EVENT</a>
          <a href="#gallery">GALLERY</a>
          <a href="#team">TEAM</a>
          <a href="#initiative">INITIATIVE</a>
          <a href="#blogs">BLOGS</a>
        </div>

        <div className="nav-profile">
          <div className="nav-avatar">M</div>
        </div>
      </nav>

      {/* Hero Header Section */}
      <header className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-label">
            <span className="live-dot"></span>
            ACTIVE STUDENT DASHBOARD
          </div>

          <h1>
            Hi, <span>{studentData.name}!</span>
          </h1>

          <p className="student-id">
            Student ID : <strong>{studentData.studentId}</strong>
          </p>

          <p className="welcome-text">
            Welcome back to your dashboard
          </p>
        </div>

        <button className="edit-profile">
          <span>✏️</span> Edit Profile
        </button>
      </header>

      {/* Student Info Grid */}
      <section className="info-section">
        <div className="info-card">
          <div className="card-icon">✉️</div>
          <span>Email</span>
          <strong>{studentData.email}</strong>
        </div>

        <div className="info-card">
          <div className="card-icon">🏫</div>
          <span>Branch</span>
          <strong>{studentData.branch}</strong>
        </div>

        <div className="info-card">
          <div className="card-icon">📅</div>
          <span>Year</span>
          <strong>{studentData.year}</strong>
        </div>

        <div className="info-card">
          <div className="division-content">
            <div>
              <span>Division</span>
              <strong>{studentData.division}</strong>
            </div>

            <div className="vertical-line"></div>

            <div>
              <span>Roll No.</span>
              <strong>{studentData.rollNo}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="section-heading">
          <div>
            <div className="heading-icon">📅</div>
            <h2>Upcoming Events</h2>
          </div>

          <button>View All</button>
        </div>

        <div className="events-list">
          {upcomingEvents.map((event: UpcomingEvent, index: number) => (
            <div
              key={event.id}
              className="event-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="event-date">
                <span>{event.month}</span>
                <strong>{event.date}</strong>
              </div>

              <div className="event-information">
                <h3>{event.title}</h3>
                <p>Datta Meghe College Campus</p>
                <small>Registrations Open</small>
              </div>

              <div className="event-arrow">➔</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <div className="section-title-row">
          <h2>Our Sponsors</h2>
          <span>🤝</span>
        </div>

        <div className="sponsors-grid">
          <div className="sponsor-card">
            <div className="sponsor-placeholder">
              SPONSOR 01
            </div>
          </div>

          <div className="sponsor-card">
            <div className="sponsor-placeholder">
              SPONSOR 02
            </div>
          </div>

          <div className="sponsor-card">
            <div className="sponsor-placeholder">
              SPONSOR 03
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quotes Cards */}
      <section className="quotes-section">
        <div className="quote-card quote-left">
          <span className="quote-mark">“</span>

          <h3>Dare. Build. Lead.</h3>

          <p>
            Every great venture begins with one bold step towards execution.
          </p>

          <span className="quote-mark quote-end">”</span>
        </div>

        <div className="quote-card quote-center">
          <span className="quote-mark">“</span>

          <h3>Dream. Innovate. Inspire.</h3>

          <p>
            Be the change and impact you wish to see in the tech ecosystem.
          </p>

          <span className="quote-mark quote-end">”</span>
        </div>

        <div className="quote-card quote-right">
          <span className="quote-mark">“</span>

          <h3>Start Small. Dream Big.</h3>

          <p>
            Consistent daily action turns simple ideas into scalable startups.
          </p>

          <span className="quote-mark quote-end">”</span>
        </div>
      </section>

      {/* Full Width Footer */}
      <footer className="dashboard-footer">
        <div className="footer-top-glow"></div>

        <div className="footer-content">

          <div className="footer-brand">
            <div className="dashboard-logo">
              <div className="logo-symbol">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="logo-name">
                <strong>ECELL</strong>
                <small>D M C E</small>
              </div>
            </div>

            <p>
              📍 Location: Datta Meghe College of Engineering, Navi Mumbai.
            </p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About us</a>
            <a href="#event">Event</a>
            <a href="#gallery">Gallery</a>
            <a href="#team">Team</a>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <a href="#faqs">FAQs</a>
            <a href="#register">Register</a>
            <a href="#volunteer">Volunteer</a>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>✉️ Ecell.dmce.14@gmail.com</p>
            <p>📷 ecell_dmce</p>
            <p>💼 ECell_DMCE</p>
          </div>

        </div>

        <div className="copyright">
          © 2025 ECELL | E-CELL DMCE. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
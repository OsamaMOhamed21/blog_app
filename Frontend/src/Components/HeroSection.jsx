import { Link } from "react-router-dom";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <header className="hero-section">
      <div className="hero-container">
        {/* Left Side: Editorial Pitch */}
        <div className="hero-content">
          <span className="hero-badge">Welcome to BlogApp</span>
          <h1 className="hero-title">
            Discover great stories & publish your thoughts.
          </h1>
          <p className="hero-subtitle">
            A minimalist space for writers, creators, and readers to connect through quality long-form articles.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-hero-primary">
              Start Writing
            </Link>
            <Link to="/blogs" className="btn-hero-secondary">
              Explore Articles
            </Link>
          </div>
        </div>

        {/* Right Side: Featured Blog Card Preview */}
        <div className="hero-featured-card">
          <span className="card-tag">Featured Post</span>
          <h3 className="card-title">
            Designing for Readability in Modern Web Applications
          </h3>
          <p className="card-excerpt">
            How subtle typography choices and whitespace transform a simple interface into a high-end reading experience...
          </p>
          <div className="card-meta">
            <span className="author-name">Omar Nabil</span>
            <span className="read-time">• 5 min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}
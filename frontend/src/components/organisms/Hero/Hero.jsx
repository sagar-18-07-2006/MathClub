import React from 'react'
import Button from '../../atoms/Button/Button.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero">
      <HeroBackground />
      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          Indian Institute of Information Technology Raichur
        </div>
        <h1 className="hero__title">
          Mathematics Club
          <span className="hero__title-sub">IIIT Raichur</span>
        </h1>
        <p className="hero__tagline">
          Where rigorous proof meets creative problem solving — explore contests,
          collaborative workshops, and the relentless pursuit of mathematical understanding.
        </p>
        <div className="hero__actions">
          <Button variant="primary" size="lg" href="/events">
            Explore Events
          </Button>
          <Button variant="secondary" size="lg" href="/weekly-problems">
            View Weekly Questions
          </Button>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">53+</span>
            <span className="hero__stat-label">Approx. Members</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-value">2</span>
            <span className="hero__stat-label">Upcoming Events</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-value">5</span>
            <span className="hero__stat-label">Completed Events</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

function HeroBackground() {
  return (
    <div className="hero__bg" aria-hidden="true">
      <svg
        className="hero__bg-svg"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Radial glow */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#2d5186" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0d1b2e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="800" fill="url(#glow)" />

        {/* Large grid */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="800"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 100}
            x2="1440"
            y2={i * 100}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Geometric shapes */}
        <polygon
          points="1200,80 1280,220 1120,220"
          fill="none"
          stroke="rgba(201,168,76,0.18)"
          strokeWidth="1.5"
        />
        <circle cx="160" cy="600" r="130" fill="none" stroke="rgba(77,184,200,0.12)" strokeWidth="1.5" />
        <circle cx="160" cy="600" r="70"  fill="none" stroke="rgba(77,184,200,0.08)" strokeWidth="1" />
        <polygon
          points="320,150 390,280 250,280"
          fill="none"
          stroke="rgba(201,168,76,0.10)"
          strokeWidth="1"
        />
        <rect x="1100" y="500" width="200" height="200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" transform="rotate(20,1200,600)" />

        {/* Scattered dots */}
        {[
          [100,200],[400,80],[700,340],[1050,160],[1320,400],
          [240,480],[850,520],[1180,650],[60,380],[980,90],
        ].map(([cx,cy],i) => (
          <circle key={`dot${i}`} cx={cx} cy={cy} r="2" fill="rgba(201,168,76,0.35)" />
        ))}

        {/* Formula text elements */}
        <text x="840" y="220" fontSize="13" fill="rgba(255,255,255,0.07)" fontFamily="Georgia,serif">∫₀^∞ e⁻ˣ² dx = √π/2</text>
        <text x="180" y="720" fontSize="12" fill="rgba(255,255,255,0.06)" fontFamily="Georgia,serif">∀ε&gt;0, ∃δ&gt;0 : |x−a|&lt;δ ⟹ |f(x)−L|&lt;ε</text>
        <text x="1000" y="700" fontSize="12" fill="rgba(255,255,255,0.06)" fontFamily="Georgia,serif">P(A∪B) = P(A) + P(B) − P(A∩B)</text>
      </svg>
    </div>
  )
}

import React from 'react'
import './Logo.css'

export default function Logo({ size = 'md' }) {
  return (
    <a href="/" className={`logo logo--${size}`} aria-label="MathClub IIIT Raichur home">
      <svg
        className="logo__icon"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Sigma symbol inside a circle */}
        <circle cx="20" cy="20" r="19" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path
          d="M27 12H14l8 8-8 8h13"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__text">
        Math<span className="logo__text--accent">Club</span>
        <span className="logo__sub">IIIT Raichur</span>
      </span>
    </a>
  )
}

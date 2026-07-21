import React from 'react'
import './IconLink.css'

export default function IconLink({ href, label, type = 'link', className = '' }) {
  return (
    <a
      href={href || '#'}
      className={`icon-link icon-link--${type} ${className}`.trim()}
      target={href?.startsWith('mailto:') ? undefined : '_blank'}
      rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      aria-label={label}
      title={label}
    >
      {type === 'email' ? <EmailIcon /> : <LinkedInIcon />}
    </a>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

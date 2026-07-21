import React from 'react'
import Logo from '../../atoms/Logo/Logo.jsx'
import './Footer.css'

const navColumns = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Home',             href: '#home' },
      { label: 'About',            href: '#about' },
      { label: 'Events',           href: '#events' },
      { label: 'Weekly Questions', href: '#questions' },
      // { label: 'Solvers',          href: '#solvers' },
      // { label: 'Gallery',          href: '#gallery' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'mathclub@iiitr.ac.in', href: 'mailto:mathclub@iiitr.ac.in' },
      { label: 'IIIT Raichur, Karnataka', href: '#' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">
              Nurturing mathematical thinking at the Indian Institute of Information Technology,
              Raichur.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              {/* <a href="#" className="footer__social-link" aria-label="GitHub">
                <GitHubIcon />
              </a> */}
            </div>
          </div>

          {navColumns.map((col) => (
            <div key={col.heading} className="footer__col">
              <h3 className="footer__col-heading">{col.heading}</h3>
              <ul className="footer__col-links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="footer__link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} Mathematics Club, IIIT Raichur. All rights reserved.
          </p>
          <p className="footer__college">
            Indian Institute of Information Technology Raichur — Karnataka, India
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (   // { label: 'Solvers',          href: '#solvers' },
      { label: 'Gallery',          href: '#gallery' },
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <path d="M7 10v7M7 7v.01M11 17v-3.5a2.5 2.5 0 0 1 5 0V17M11 10v7"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

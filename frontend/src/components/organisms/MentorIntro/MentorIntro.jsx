import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import './MentorIntro.css'

export default function MentorIntro() {
  return (
    <section className="mentor section">
      <div className="container">
        <SectionTitle eyebrow="Guidance" title="Mentor Introduction" subtitle="Academic mentorship keeps the club focused on depth, discipline, and long-term mathematical growth." />
        <div className="mentor__card">
          <div className="mentor__symbol">∑</div>
          <div>
            <span className="mentor__label">Faculty Mentor</span>
            <h3>Mathematics Club Mentor</h3>
            <p>The mentor section can be updated with the faculty name, photograph, research interests, and message. This area is designed to present the club with a formal academic identity while keeping the previous navy-gold design language intact.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

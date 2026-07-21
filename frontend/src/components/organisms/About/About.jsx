import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import './About.css'

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Rigorous Problem Solving',
    description:
      'We tackle carefully curated problems that demand precision, creativity, and depth — from classic olympiad challenges to contemporary competition mathematics.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 12h12M10 16h8M10 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Structured Workshops',
    description:
      'From linear algebra bootcamps to graph theory deep-dives, our workshops are designed to build intuition and formal understanding simultaneously.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M8 26V12l8-6 8 6v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="13" y="18" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Competitions & Contests',
    description:
      'We organize intra-college contests and guide members toward inter-collegiate competitions, Olympiads, and national-level mathematical challenges.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="11" cy="13" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="21" cy="13" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 28c0-4 3-6 5-6h10c2 0 5 2 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Collaborative Discussions',
    description:
      'Our weekly discussion sessions foster a culture of collaborative learning where diverse approaches to the same problem reveal deep mathematical structure.',
  },
]

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__intro">
            <SectionTitle
              eyebrow="Who We Are"
              title="A Community Built on Mathematical Curiosity"
              align="left"
            />
            <p className="about__body">
              The Mathematics Club of IIIT Raichur is a student-run organization dedicated to
              cultivating a deep and lasting appreciation for mathematics — its elegance, its
              challenges, and its pervasive role in computing and science.
            </p>
            <p className="about__body">
              We believe that mathematics is not a passive subject — it demands active engagement,
              debate, and the willingness to sit with hard questions. Whether you are a seasoned
              olympiad contestant or a first-year student curious about proofs, this club is your
              forum.
            </p>
            <div className="about__quote">
              <blockquote>
                "The essence of mathematics lies in its freedom."
              </blockquote>
              <cite>— Georg Cantor</cite>
            </div>
          </div>

          <div className="about__pillars">
            {pillars.map((p) => (
              <div key={p.title} className="about__pillar">
                <div className="about__pillar-icon">{p.icon}</div>
                <div>
                  <h3 className="about__pillar-title">{p.title}</h3>
                  <p className="about__pillar-description">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

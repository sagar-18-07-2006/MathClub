import React from 'react'
import PageHero from '../../components/organisms/PageHero/PageHero.jsx'
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle.jsx'
import { developers } from '../../data/team.js'
import './DevelopersPage.css'

export default function DevelopersPage() {
  const leadDeveloper = developers.find((developer) =>
    developer.role.toLowerCase().includes('lead')
  )

  const otherDevelopers = developers.filter(
    (developer) => developer.id !== leadDeveloper?.id
  )

  return (
    <main>
      <PageHero
        eyebrow="Developers"
        title="Website Development Team"
        subtitle="The students who designed, developed, tested, and maintained the Mathematics Club website."
      />

      <section className="section developers-page">
        <div className="container">
          <SectionTitle
            eyebrow="Development Team"
            title="Meet the Developers"
            subtitle="The team that contributed to structure, design, content, responsiveness, and deployment."
          />

          {leadDeveloper && (
            <div className="lead-developer-area">
              <DeveloperCard developer={leadDeveloper} isLead />
            </div>
          )}

          <div className="developers-grid">
            {otherDevelopers.map((developer) => (
              <DeveloperCard developer={developer} key={developer.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function DeveloperCard({ developer, isLead = false }) {
  return (
    <article className={`developer-card ${isLead ? 'developer-card--lead' : ''}`}>
      <div className="developer-card__image-box">
        <img
          src={developer.photo || '/assets/members/avatar.svg'}
          alt={developer.name}
          className="developer-card__image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/assets/members/avatar.svg'
          }}
        />
      </div>

      <div className="developer-card__body">
        <div className="developer-card__top">
          {isLead ? (
            <span className="developer-card__badge">Lead Developer</span>
          ) : (
            <span className="developer-card__role-badge">{developer.role}</span>
          )}
        </div>

        <h3 className="developer-card__name">{developer.name}</h3>

        {isLead && <p className="developer-card__role">{developer.role}</p>}

        <div className="developer-card__socials">
          {developer.linkedin && (
            <a href={developer.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          )}

          {developer.github && (
            <a href={developer.github} target="_blank" rel="noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          )}

          {developer.email && (
            <a href={`mailto:${developer.email}`}>
              <GmailIcon />
              <span>Gmail</span>
            </a>
          )}
        </div>

        <div className="developer-card__contribution">
          <h4>Contribution</h4>
          <p>{developer.contribution}</p>
        </div>
      </div>
    </article>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.94 8.75H3.56v11.7h3.38V8.75zM5.25 3.55a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.45 20.45h-3.38v-5.7c0-1.36-.02-3.12-1.9-3.12-1.9 0-2.2 1.49-2.2 3.03v5.79H9.6V8.75h3.24v1.6h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18v6.67z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49v-1.93c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.95.68 1.91v2.8c0 .27.18.58.69.49A10.08 10.08 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm8 7.2L4.4 7.4V17h15.2V7.4L12 12.2zm0-2.1L18.1 7H5.9L12 10.1z" />
    </svg>
  )
}
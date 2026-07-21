import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import TeamCard from '../../molecules/TeamCard/TeamCard.jsx'
import Button from '../../atoms/Button/Button.jsx'
import { teamOptions } from '../../../data/team.js'
import './TeamSection.css'

export default function TeamSection({ showButton = true }) {
  return (
    <section className="team-section section" id="team-section">
      <div className="container">
        <SectionTitle
          eyebrow="Club Teams"
          title="People Who Keep the Club Active"
          subtitle="Explore each team through clickable cards while preserving the existing professional navy and gold card style."
        />
        <div className="team-section__grid">
          {teamOptions.map((team) => (
            <TeamCard key={team.id} {...team} />
          ))}
        </div>
        {showButton && (
          <div className="section-action">
            <Button href="/team" variant="ghost">View Complete Team</Button>
          </div>
        )}
      </div>
    </section>
  )
}

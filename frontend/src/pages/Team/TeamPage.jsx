import React from 'react'
import { useParams } from 'react-router-dom'
import PageHero from '../../components/organisms/PageHero/PageHero.jsx'
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle.jsx'
import TeamSection from '../../components/organisms/TeamSection/TeamSection.jsx'
import MemberCard from '../../components/molecules/MemberCard/MemberCard.jsx'
import MentorIntro from '../../components/organisms/MentorIntro/MentorIntro.jsx'
import { getMembersByTeam, getTeamBySlug, members } from '../../data/team.js'
import './TeamPage.css'

export default function TeamPage() {
  const { teamSlug } = useParams()
  const selectedTeam = teamSlug ? getTeamBySlug(teamSlug) : null
  const visibleMembers = teamSlug ? getMembersByTeam(teamSlug) : members

  return (
    <main>
      <PageHero
        eyebrow="Team"
        title={selectedTeam ? selectedTeam.title : 'People Behind the Mathematics Club'}
        subtitle={selectedTeam ? selectedTeam.description : 'Explore developers, core team, event team, design team, content team, mentors, and contributors.'}
      />

      <MentorIntro />

      {!teamSlug && <TeamSection showButton={false} />}
      
      <section className="section section--alt">
        <div className="container">
          <SectionTitle
            eyebrow="Members"
            title={selectedTeam ? `${selectedTeam.title} Members` : 'All Club Members'}
            subtitle="Mentor guidance appears first, followed by team member cards with photo, name, role, short bio, LinkedIn, and email links."
          />
          <div className="team-page__grid">
            {visibleMembers.map((member) => (
              <MemberCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

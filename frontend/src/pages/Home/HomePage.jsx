import React from 'react'
import Hero from '../../components/organisms/Hero/Hero.jsx'
import About from '../../components/organisms/About/About.jsx'
import Events from '../../components/organisms/Events/Events.jsx'
import TeamSection from '../../components/organisms/TeamSection/TeamSection.jsx'
import ProblemsSection from '../../components/organisms/ProblemsSection/ProblemsSection.jsx'
import LeaderboardSection from '../../components/organisms/LeaderboardSection/LeaderboardSection.jsx'
import Gallery from '../../components/organisms/Gallery/Gallery.jsx'
import MentorIntro from '../../components/organisms/MentorIntro/MentorIntro.jsx'
import StatsStrip from '../../components/organisms/StatsStrip/StatsStrip.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <About />
      <MentorIntro />
      {/* <Events preview /> */}
      <TeamSection />
      {/* <ProblemsSection compact /> */}
      {/* <LeaderboardSection compact /> */}
      <Gallery />
    </main>
  )
}

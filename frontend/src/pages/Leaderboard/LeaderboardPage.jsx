import React from 'react'
import PageHero from '../../components/organisms/PageHero/PageHero.jsx'
import LeaderboardSection from '../../components/organisms/LeaderboardSection/LeaderboardSection.jsx'

export default function LeaderboardPage() {
  return (
    <main>
      <PageHero eyebrow="Leaderboard" title="Full Solver Leaderboard" subtitle="Search, sort, and review all recognized weekly problem solvers." />
      <LeaderboardSection />
    </main>
  )
}

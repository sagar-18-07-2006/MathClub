import React from 'react'
import PageHero from '../../components/organisms/PageHero/PageHero.jsx'
import ProblemsSection from '../../components/organisms/ProblemsSection/ProblemsSection.jsx'

export default function ProblemsPage() {
  return (
    <main>
      <PageHero eyebrow="Problems" title="Weekly Questions Archive" subtitle="A dedicated page for current and previous mathematics problems." />
      <ProblemsSection />
    </main>
  )
}

import React from 'react'
import PageHero from '../../components/organisms/PageHero/PageHero.jsx'
import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle.jsx'
import InfoCard from '../../components/atoms/InfoCard/InfoCard.jsx'
import Button from '../../components/atoms/Button/Button.jsx'
import { blogs } from '../../data/siteData.js'
import './BlogPage.css'

export default function BlogPage() {
  return <main><PageHero eyebrow="Blog" title="Mathematics Club Journal" subtitle="Editorials, event notes, problem-solving guides, and mathematical reflections from the club." />
    <section className="section"><div className="container"><SectionTitle eyebrow="Articles" title="Latest Writings" subtitle="Use this page for editorials, announcements, and event reports." /><div className="blog-page__grid">{blogs.map(b => (<InfoCard key={b.id} eyebrow={b.category} title={b.title} meta={b.date} description={b.excerpt} >
  {b.pdf && (
    <Button href={b.pdf} target="_blank" rel='noopener noreferrer' variant='primary' size='sm' className='BlogPageButton'>Read the full Article</Button>
    )}</InfoCard>
  ))}</div></div></section>
  </main>
}

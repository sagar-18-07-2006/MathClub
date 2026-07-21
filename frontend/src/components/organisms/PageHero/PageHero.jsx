import React from 'react'
import './PageHero.css'

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero__pattern" aria-hidden="true" />
      <div className="container page-hero__inner">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}

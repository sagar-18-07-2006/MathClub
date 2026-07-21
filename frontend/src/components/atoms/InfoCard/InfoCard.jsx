import React from 'react'
import './InfoCard.css'

export default function InfoCard({ eyebrow, title, description, meta, children }) {
  return (
    <article className="info-card">
      {eyebrow && <span className="info-card__eyebrow">{eyebrow}</span>}
      <h3 className="info-card__title">{title}</h3>
      {meta && <p className="info-card__meta">{meta}</p>}
      {description && <p className="info-card__description">{description}</p>}
      {children && <div className="info-card__body">{children}</div>}
    </article>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import './TeamCard.css'

export default function TeamCard({ title, description, count, href, icon }) {
  return (
    <Link className="team-card" to={href}>
      <span className="team-card__icon" aria-hidden="true">{icon || '∑'}</span>
      <span className="team-card__content">
        <span className="team-card__count">{count}</span>
        <span className="team-card__title">{title}</span>
        <span className="team-card__description">{description}</span>
      </span>
      <span className="team-card__arrow" aria-hidden="true">→</span>
    </Link>
  )
}

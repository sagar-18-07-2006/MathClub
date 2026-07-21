import React from 'react'
import Badge from '../../atoms/Badge/Badge.jsx'
import Button from '../../atoms/Button/Button.jsx'
import './ProblemCard.css'

export default function ProblemCard({ week, period, title, topic, difficulty, pdfUrl, current = false }) {
  return (
    <article className={`problem-card ${current ? 'problem-card--current' : ''}`}>
      <div className="problem-card__top">
        <span className="problem-card__week">{week}</span>
        <Badge label={difficulty} type="difficulty" />
      </div>
      <h3 className="problem-card__title">{title}</h3>
      <p className="problem-card__topic">{topic}</p>
      <p className="problem-card__period">{period}</p>
      <Button href={pdfUrl} variant={current ? 'primary' : 'ghost'} size="sm" target="_blank" rel="noopener noreferrer">
        View Question
      </Button>
    </article>
  )
}

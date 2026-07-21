import React from 'react'
import Badge from '../../atoms/Badge/Badge.jsx'
import Button from '../../atoms/Button/Button.jsx'
import './QuestionCard.css'

export default function QuestionCard({ title, topic, difficulty, week, date, status, statement }) {
  return (
    <article className="question-card">
      <header className="question-card__header">
        <div className="question-card__badges">
          <Badge label={difficulty} type="difficulty" />
          <Badge label={status} type="status" />
        </div>
        <span className="question-card__week">{week}</span>
      </header>
      <div className="question-card__body">
        <h3 className="question-card__title">{title}</h3>
        <p className="question-card__topic">
          <TopicIcon />
          {topic}
        </p>
        <p className="question-card__statement">{statement}</p>
      </div>
      <footer className="question-card__footer">
        <time className="question-card__date">{date}</time>
        <Button variant="ghost" size="sm">View Question</Button>
      </footer>
    </article>
  )
}

function TopicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

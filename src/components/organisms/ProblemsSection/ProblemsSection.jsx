import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import Button from '../../atoms/Button/Button.jsx'
import ProblemCard from '../../molecules/ProblemCard/ProblemCard.jsx'
import { currentQuestion, pastQuestions } from '../../../data/questions.js'
import './ProblemsSection.css'

export default function ProblemsSection({ compact = false }) {
  const problems = [
    { ...currentQuestion, id: 'current', current: true },
    ...pastQuestions,
  ]

  const visibleProblems = compact ? problems.slice(0, 5) : problems

  return (
    <section className="problems-section section" id="problems">
      <div className="container">
        <SectionTitle
          eyebrow="Weekly Problems"
          title={compact ? 'Problems Preview' : 'Problems and Weekly Questions'}
          subtitle={compact ? 'A limited, scrollable home-page view of current and recent problems.' : 'Browse the current weekly problem and the complete archive of previous questions.'}
        />
        <div className="submission-notice">
          <div className="submission-notice__left">
            <h3>Solution Submission</h3>
            <p>Submit your solution PDF by emailing it to the Mathematics Club.</p>
            <p><strong>Email:</strong>{" "}<a href="mailto:mathematics_club@iiitr.ac.in">mathematics_club@iiitr.ac.in</a></p>
            <p><strong>Subject:</strong>{" "}{currentQuestion.week} – {currentQuestion.title}</p>
          </div>
          <div className="submission-notice__right">
            <h4>Submission Checklist</h4>
            <ul>
              <li>PDF format only</li>
              <li>Include your Name</li>
              <li>Include your Roll Number</li>
              <li>Mention the Problem Title</li>
            </ul>
          </div>
        </div>
        <div className={`problems-section__scroller ${compact ? 'problems-section__scroller--compact' : ''}`}>
          <div className="problems-section__grid">
            {visibleProblems.map((problem) => (
              <ProblemCard key={problem.id} {...problem} />
            ))}
          </div>
        </div>
        {compact && (
          <div className="section-action">
            <Button href="/problems" variant="ghost">View All Problems</Button>
          </div>
        )}
      </div>
    </section>
  )
}

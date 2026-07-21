import React, { useState } from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import Badge from '../../atoms/Badge/Badge.jsx'
import Button from '../../atoms/Button/Button.jsx'
import { currentQuestion, pastQuestions } from '../../../data/questions.js'
import './WeeklyQuestions.css'

export default function WeeklyQuestions() {
  const [previewPdf, setPreviewPdf] = useState(null) // null | { week, title, pdfUrl }

  return (
    <section className="questions section" id="questions">
      <div className="container">
        <SectionTitle
          eyebrow="Weekly Question"
          title="This Week's Problem"
          subtitle="One new problem every Monday. Download the PDF, work through it, and submit your solution via the form."
        />

        {/* ── Active question card ─────────────────────────── */}
        <div className="wq-current">
          <div className="wq-current__left">
            <div className="wq-current__meta">
              <span className="wq-current__week-label">{currentQuestion.week}</span>
              <Badge label={currentQuestion.difficulty} type="difficulty" />
              <span className="wq-current__period">{currentQuestion.period}</span>
            </div>
            <h3 className="wq-current__title">{currentQuestion.title}</h3>
            <p className="wq-current__topic">
              <TopicIcon />
              {currentQuestion.topic}
            </p>
            <p className="wq-current__hint">
              The full problem statement is in the PDF. Read carefully before attempting.
            </p>
            <div className="wq-current__actions">
              <a
                href={currentQuestion.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--md"
              >
                <PdfIcon />
                View Question PDF
              </a>
              <a
                href={currentQuestion.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--md"
              >
                <FormIcon />
                Submit Solution
              </a>
            </div>
          </div>
          <div className="wq-current__right" aria-hidden="true">
            <MathDecor />
          </div>
        </div>

        {/* ── Past questions archive ───────────────────────── */}
        <div className="wq-archive">
          <h3 className="wq-archive__heading">
            <ArchiveIcon />
            Past Questions
          </h3>
          <div className="wq-archive__table-wrap">
            <table className="wq-archive__table" aria-label="Past weekly questions">
              <thead>
                <tr>
                  <th scope="col">Week</th>
                  <th scope="col">Title</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Period</th>
                  <th scope="col" className="wq-archive__th-action">Question</th>
                </tr>
              </thead>
              <tbody>
                {pastQuestions.map((q) => (
                  <tr key={q.id} className="wq-archive__row">
                    <td className="wq-archive__week">{q.week}</td>
                    <td className="wq-archive__title-cell">{q.title}</td>
                    <td className="wq-archive__topic-cell">
                      <span className="wq-archive__topic-tag">{q.topic}</span>
                    </td>
                    <td>
                      <Badge label={q.difficulty} type="difficulty" />
                    </td>
                    <td className="wq-archive__period">{q.period}</td>
                    <td className="wq-archive__action-cell">
                      <button
                        className="wq-archive__preview-btn"
                        onClick={() => setPreviewPdf(q)}
                        aria-label={`Preview ${q.week} PDF`}
                      >
                        <EyeIcon />
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── PDF Preview Modal ────────────────────────────────── */}
      {previewPdf && (
        <PdfModal question={previewPdf} onClose={() => setPreviewPdf(null)} />
      )}
    </section>
  )
}

/* ── PDF Modal ─────────────────────────────────────────────────────────────── */
function PdfModal({ question, onClose }) {
  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="pdf-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`PDF preview: ${question.title}`}
      onClick={handleBackdropClick}
    >
      <div className="pdf-modal__box">
        <header className="pdf-modal__header">
          <div className="pdf-modal__header-info">
            <span className="pdf-modal__week">{question.week}</span>
            <h3 className="pdf-modal__title">{question.title}</h3>
          </div>
          <button
            className="pdf-modal__close"
            onClick={onClose}
            aria-label="Close PDF preview"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="pdf-modal__viewer">
          <iframe
            src={`${question.pdfUrl}#toolbar=0&navpanes=0`}
            title={`${question.week} — ${question.title}`}
            className="pdf-modal__iframe"
          />
          <div className="pdf-modal__fallback">
            <p>PDF preview not available in this browser.</p>
            <a
              href={question.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--md"
            >
              <PdfIcon /> Open PDF
            </a>
          </div>
        </div>

        <footer className="pdf-modal__footer">
          <a
            href={question.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost btn--sm"
          >
            <PdfIcon /> Open in new tab
          </a>
          <button className="btn btn--primary btn--sm" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  )
}

/* ── SVG Icon helpers ──────────────────────────────────────────────────────── */
function PdfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  )
}

function FormIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="21 8 21 21 3 21 3 8"/>
      <rect x="1" y="3" width="22" height="5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  )
}

function TopicIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function MathDecor() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="wq-current__decor-svg" aria-hidden="true">
      <circle cx="160" cy="140" r="110" stroke="rgba(201,168,76,0.12)" strokeWidth="1.5"/>
      <circle cx="160" cy="140" r="70"  stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
      <polygon points="160,40 250,195 70,195" fill="none" stroke="rgba(77,184,200,0.18)" strokeWidth="1.5"/>
      <text x="120" y="120" fontSize="22" fill="rgba(201,168,76,0.25)" fontFamily="Georgia,serif">∑</text>
      <text x="150" y="175" fontSize="14" fill="rgba(77,184,200,0.22)" fontFamily="Georgia,serif">∫∞</text>
      <text x="75" y="165" fontSize="13" fill="rgba(255,255,255,0.12)" fontFamily="Georgia,serif">φ</text>
      <text x="200" y="100" fontSize="13" fill="rgba(255,255,255,0.12)" fontFamily="Georgia,serif">π</text>
      <circle cx="250" cy="65"  r="3" fill="rgba(201,168,76,0.4)"/>
      <circle cx="68"  cy="100" r="2" fill="rgba(77,184,200,0.4)"/>
      <circle cx="290" cy="200" r="2" fill="rgba(201,168,76,0.3)"/>
    </svg>
  )
}

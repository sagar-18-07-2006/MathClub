import React, { useState, useEffect } from 'react'
import './TeamDashboard.css'

export default function TeamDashboard({ members, selectedYear, setSelectedYear, years }) {
  const [activeId, setActiveId] = useState(null)

  // Auto-select the first member when members array or selected year changes
  useEffect(() => {
    if (members && members.length > 0) {
      setActiveId(members[0].id)
    } else {
      setActiveId(null)
    }
  }, [members, selectedYear])

  const activeMember = members.find(m => m.id === activeId) || members[0] || null

  const handleYearChange = (year) => {
    setSelectedYear(year)
  }

  // Calculate random/spaced rotations for cards to fan out
  const getCardStyle = (index, total) => {
    if (total === 1) return { transform: 'rotate(0deg)' }
    // Spread rotations between -8 and +8 degrees
    const step = 16 / Math.max(total - 1, 1)
    const rotation = -8 + (index * step)
    const xOffset = -20 + (index * 20)
    const yOffset = -5 + (Math.abs(index - (total - 1) / 2) * -10)
    
    return {
      transform: `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`,
      zIndex: activeId === members[index].id ? total + 1 : index
    }
  }

  return (
    <div className="team-dashboard liquidGlass-wrapper">
      <div className="liquidGlass-effect">
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
      </div>
      {/* Sidebar Section */}
      <div className="team-dashboard__sidebar" aria-label="Year navigation sidebar">
        {years.map((year) => {
          const isActive = selectedYear === year
          return (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`sidebar-dot-btn liquidGlass-wrapper ${isActive ? 'active' : ''}`}
              aria-label={`Select ${year}`}
            >
              <div className="liquidGlass-effect">
                <div className="liquidGlass-tint"></div>
                <div className="liquidGlass-shine"></div>
              </div>
              <span className="sidebar-dot-btn__circle"></span>
              <span className="sidebar-dot-btn__tooltip">{year}</span>
            </button>
          )
        })}
      </div>

      {/* Main Dashboard Layout */}
      <div className="team-dashboard__content">
        <div className="team-dashboard__grid">
          {/* Left panel containing Deck & List */}
          <div className="team-dashboard__left-panel">
            {/* Deck of cards */}
            <div className="team-dashboard__deck-container">
              <div className="team-dashboard__deck">
                {members.slice(0, 3).map((member, index) => {
                  const isActive = activeId === member.id
                  const total = Math.min(members.length, 3)
                  return (
                    <div
                      key={member.id}
                      className={`deck-card liquidGlass-wrapper ${isActive ? 'active' : ''}`}
                      style={getCardStyle(index, total)}
                      onClick={() => setActiveId(member.id)}
                    >
                      <div className="liquidGlass-effect">
                        <div className="liquidGlass-tint"></div>
                        <div className="liquidGlass-shine"></div>
                      </div>
                      <div className="deck-card__header">
                        <div className="deck-card__pill"></div>
                        <div className="deck-card__avatar-dot">
                          <img
                            src={member.photo || '/assets/members/avatar.svg'}
                            alt=""
                            onError={(e) => { e.currentTarget.src = '/assets/members/avatar.svg' }}
                          />
                        </div>
                      </div>
                      <div className="deck-card__footer">
                        <div className="deck-card__text-line deck-card__text-line--title">{member.name}</div>
                        <div className="deck-card__text-line deck-card__text-line--sub">{member.role}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* List / Table */}
            <div className="team-dashboard__list-container">
              <div className="team-dashboard__list-header">
                <span>Member Name</span>
                <span>Role</span>
                <span>Actions</span>
              </div>
              <div className="team-dashboard__list">
                {members.map((member) => {
                  const isActive = activeId === member.id
                  return (
                    <div
                      key={member.id}
                      className={`list-row liquidGlass-wrapper ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveId(member.id)}
                    >
                      <div className="liquidGlass-effect">
                        <div className="liquidGlass-tint"></div>
                        <div className="liquidGlass-shine"></div>
                      </div>
                      <div className="list-row__left">
                        <div className="list-row__avatar">
                          <img
                            src={member.photo || '/assets/members/avatar.svg'}
                            alt={member.name}
                            onError={(e) => { e.currentTarget.src = '/assets/members/avatar.svg' }}
                          />
                        </div>
                        <div className="list-row__info">
                          <span className="list-row__name">{member.name}</span>
                          <span className="list-row__year-badge">{member.year}</span>
                        </div>
                      </div>
                      <div className="list-row__center-dash">
                        <span className="dash-line"></span>
                      </div>
                      <div className="list-row__right">
                        <span className="list-row__role">{member.role}</span>
                        <div className="list-row__actions" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="list-action-btn liquidGlass-wrapper"
                            title="LinkedIn"
                          >
                            <div className="liquidGlass-effect">
                              <div className="liquidGlass-tint"></div>
                              <div className="liquidGlass-shine"></div>
                            </div>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="liquidGlass-icon">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </a>
                          <a
                            href={member.email ? `mailto:${member.email}` : '#'}
                            className="list-action-btn liquidGlass-wrapper"
                            title="Email"
                          >
                            <div className="liquidGlass-effect">
                              <div className="liquidGlass-tint"></div>
                              <div className="liquidGlass-shine"></div>
                            </div>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="liquidGlass-icon">
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <path d="m3 7 9 6 9-6" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right details panel */}
          <div className="team-dashboard__details-panel">
            {activeMember ? (
              <div className="details-card liquidGlass-wrapper">
                <div className="liquidGlass-effect">
                  <div className="liquidGlass-tint"></div>
                  <div className="liquidGlass-shine"></div>
                </div>
                {/* Curved Notch Header Decor */}
                <div className="details-card__notch-header">
                  <div className="details-card__notch-cutout">
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 0 C 30 0, 40 18, 50 18 C 60 18, 70 0, 100 0 Z" className="notch-path" />
                    </svg>
                  </div>
                  <div className="details-card__header-actions">
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="header-action-btn liquidGlass-wrapper"
                      title="LinkedIn"
                    >
                      <div className="liquidGlass-effect">
                        <div className="liquidGlass-tint"></div>
                        <div className="liquidGlass-shine"></div>
                      </div>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="liquidGlass-icon">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a
                      href={activeMember.email ? `mailto:${activeMember.email}` : '#'}
                      className="header-action-btn liquidGlass-wrapper"
                      title="Email"
                    >
                      <div className="liquidGlass-effect">
                        <div className="liquidGlass-tint"></div>
                        <div className="liquidGlass-shine"></div>
                      </div>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="liquidGlass-icon">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="details-card__body">
                  <div className="details-card__photo-container">
                    <img
                      src={activeMember.photo || '/assets/members/avatar.svg'}
                      alt={activeMember.name}
                      className="details-card__photo"
                      onError={(e) => { e.currentTarget.src = '/assets/members/avatar.svg' }}
                    />
                  </div>
                  
                  <h3 className="details-card__name">{activeMember.name}</h3>
                  <div className="details-card__role-tag">{activeMember.role}</div>
                  
                  <p className="details-card__bio">{activeMember.bio}</p>


                </div>

                <div className="details-card__footer">
                  <span className="details-card__footer-accent">FWF / {activeMember.year}</span>
                  <div className="details-card__footer-dots">
                    <span className="decor-dot"></span>
                    <span className="decor-dot"></span>
                    <span className="decor-dot active"></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="details-card--empty">
                <p>Select a member to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

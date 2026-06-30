import React, { useState } from 'react'
import { completedEvents, upcomingEvents } from '../../data/siteData.js'
import './EventsPage.css'

export default function EventsPage() {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleStarburstHover = (e, hover) => {
    if (hover) {
      const rotation = Math.random() * 20 - 10;
      e.currentTarget.style.transform = `translateY(-50%) scale(1.1) rotate(${rotation}deg)`;
    } else {
      e.currentTarget.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
    }
  }

  return (
    <div className="events-page-root">
      <main className="relative min-h-screen content-overlay">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-eyebrow-container">
            <span className="font-label-mono hero-eyebrow text-label-mono">Events</span>
          </div>
          <h1 className="font-display-lg hero-title">
            Sessions, Celebrations and Mathematical Gatherings
          </h1>
        </section>

        {/* Upcoming Events Section */}
        <section className="events-section">
          {/* Background Halftone */}
          <div className="halftone-overlay"></div>
          
          <div className="section-header">
            <span className="font-label-caps section-badge">Upcoming</span>
            <h2 className="font-display-lg section-title">Upcoming Events</h2>
            <p className="font-body-md section-subtitle">
              Planned activities for members and mathematics enthusiasts.
            </p>
          </div>

          <div className="carousel-container">
            {/* Left/Right Starburst Controls (Visual Elements) */}
            <div 
              className="carousel-control carousel-control--left"
              style={{ transform: 'translateY(-50%)' }}
              onMouseEnter={(e) => handleStarburstHover(e, true)}
              onMouseLeave={(e) => handleStarburstHover(e, false)}
            >
              <button className="starburst" aria-label="Previous event">
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
              </button>
            </div>
            
            <div 
              className="carousel-control carousel-control--right"
              style={{ transform: 'translateY(-50%)' }}
              onMouseEnter={(e) => handleStarburstHover(e, true)}
              onMouseLeave={(e) => handleStarburstHover(e, false)}
            >
              <button className="starburst" aria-label="Next event">
                <span className="material-symbols-outlined">arrow_forward_ios</span>
              </button>
            </div>

            {/* Upcoming Grid */}
            <div className="events-grid">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card-neo">
                  <div className="event-card-neo__image-wrap">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="event-card-neo__image"
                      onError={(e) => { e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3R4GAxZswVsN3R28xOgxgGxkYlXa2_RV742gCFNZeCRIntJalsLnOpH_zYISASeb9lNIiQGgheHV6-Dn_84K5BTwqeTbmgPs5VrKSPVj7pUFHL2I2LwULC8YEu8K2nduxcDjTltsL1aW7Hl9c8SwW53IZ_P-TF8EE50yKIJkI7bW48VBO-Jz0y7ZXSflceMgCK0FSdUCjbTSD6rEAxMxXj7AYrriwhyvpVquTgTiaXyWdaM7-suQOxmKglmDOq_zbyIR1j051oYsX' }}
                    />
                    <div className="event-card-neo__badge-left font-label-caps text-label-caps">
                      {event.tag.toUpperCase()}
                    </div>
                    {event.extraTags && event.extraTags.length > 0 && (
                      <div className="event-card-neo__badge-right-wrap">
                        {event.extraTags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`font-label-mono event-card-neo__badge-right text-label-mono rotate-badge-${idx}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="event-card-neo__body">
                    <p className="font-label-mono event-card-neo__date text-label-mono">{event.date}</p>
                    <h3 className="font-headline-md event-card-neo__title">{event.title}</h3>
                    <p className="font-body-md event-card-neo__desc">{event.description}</p>
                    <div className="event-card-neo__action-wrap">
                      <button className="event-card-neo__button font-headline-md">
                        <span className="skew-inner">Explore More</span>
                        <span className="material-symbols-outlined skew-inner">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Completed Events Section */}
        <section className="archive-section">
          {/* Background Halftone */}
          <div className="halftone-overlay"></div>

          <div className="archive-header">
            <span className="font-label-caps archive-eyebrow text-label-caps">Archive</span>
            <h2 className="font-display-lg archive-title">Completed Events</h2>
          </div>

          <div className="archive-container">
            {/* Archive Grid */}
            <div className="events-grid">
              {completedEvents.slice(0, visibleCount).map((event) => (
                <div key={event.id} className="event-card-neo">
                  <div className="event-card-neo__image-wrap">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="event-card-neo__image"
                      onError={(e) => { e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrcCT2QimUjaNWZJgXMnOrbiZh11LUzBJLH7XXAGknvR_gqHk2vyacwvRRhvTGX6XjtsNxp-2dSDExrS36nsHwU3t0iUYSrFOOw8RGqJcjzwR8D2D1ZpvwvnbyFXlkK_wATNvpd3eWd2N8lkouJv6gkN5huRZ3bREsPPo9sfd8wbCAAvcPJ1TBXsIhqwt4OIvnuNAH_fjyzhvUbb3r4u2sjbdTHMdrFZ0Cy0kRm_A6H59sRJEDC5cT_Sk-OWo-7H7LV8M7Uqaq6wR8' }}
                    />
                    <div className="event-card-neo__badge-left font-label-caps text-label-caps">
                      {event.tag.toUpperCase()}
                    </div>
                    {event.extraTags && event.extraTags.length > 0 && (
                      <div className="event-card-neo__badge-right-wrap">
                        {event.extraTags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`font-label-mono event-card-neo__badge-right text-label-mono rotate-badge-${idx}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="event-card-neo__body">
                    <p className="font-label-mono event-card-neo__date text-label-mono">{event.date}</p>
                    <h3 className="font-headline-md event-card-neo__title">{event.title}</h3>
                    <p className="font-body-md event-card-neo__desc">{event.description}</p>
                    <div className="event-card-neo__action-wrap">
                      <button className="event-card-neo__button font-headline-md">
                        <span className="skew-inner">Explore More</span>
                        <span className="material-symbols-outlined skew-inner">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Option */}
            {completedEvents.length > visibleCount && (
              <div className="view-more-container">
                <button 
                  className="view-more-btn font-headline-md"
                  onClick={() => setVisibleCount(completedEvents.length)}
                >
                  <span className="skew-inner">View More</span>
                  <span className="material-symbols-outlined skew-inner">expand_more</span>
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}

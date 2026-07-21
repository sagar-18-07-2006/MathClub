import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import Button from '../../atoms/Button/Button.jsx'
import EventCard from '../../molecules/EventCard/EventCard.jsx'
import events from '../../../data/events.js'
import { upcomingEvents } from '../../../data/siteData.js'
import './Events.css'

export default function Events({ preview = false }) {
  const visibleEvents = preview ? upcomingEvents : events

  return (
    <section className="events section section--alt" id="events">
      <div className="container">
        <SectionTitle
          eyebrow="Events"
          title={preview ? 'Upcoming Events' : 'Completed and Upcoming Events'}
          subtitle={
            preview
              ? 'A quick look at the next activities planned by the Mathematics Club. Visit the events page for the full archive.'
              : 'All event types are shown here, including completed activities and upcoming technical sessions or mathematics day celebrations.'
          }
        />
        <div className={`events__grid${preview ? ' events__grid--preview' : ''}`}>
          {visibleEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
        <div className="section-action">
          <Button href="/events" variant="ghost">
            {preview ? 'View All Events' : 'View All Events'}
          </Button>
        </div>
      </div>
    </section>
  )
}

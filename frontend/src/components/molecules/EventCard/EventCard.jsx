import React from 'react'
import Badge from '../../atoms/Badge/Badge.jsx'
import './EventCard.css'

export default function EventCard({ title, date, description, image, tag }) {
  return (
    <article className="event-card">
      <div className="event-card__image-wrap">
        <img
          src={image}
          alt={`${title} event`}
          className="event-card__image"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/assets/events/placeholder.svg' }}
        />
        <div className="event-card__tag-wrap">
          <Badge label={tag} type="tag" />
        </div>
      </div>
      <div className="event-card__body">
        <time className="event-card__date" dateTime={date}>{date}</time>
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__description">{description}</p>
      </div>
    </article>
  )
}

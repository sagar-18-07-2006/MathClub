import React from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import gallery from '../../../data/gallery.js'
import './Gallery.css'

export default function Gallery() {
  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <SectionTitle
          eyebrow="Gallery"
          title="Moments from the Club"
          subtitle="Snapshots from our events, workshops, and competitions across the academic year."
        />
        <div className="gallery__grid">
          {gallery.map((item, index) => (
            <figure
              key={item.id}
              className={`gallery__item gallery__item--${(index % 5 === 0 || index % 5 === 3) ? 'wide' : 'normal'}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="gallery__image"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = '/assets/gallery/placeholder.svg' }}
              />
              <figcaption className="gallery__caption">{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

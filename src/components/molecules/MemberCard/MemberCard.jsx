import React from 'react'
import IconLink from '../../atoms/IconLink/IconLink.jsx'
import Badge from '../../atoms/Badge/Badge.jsx'
import './MemberCard.css'

export default function MemberCard({ photo, name, role, bio, linkedin, email, year }) {
  return (
    <article className="member-card">
      <img
        src={photo || '/assets/members/avatar.svg'}
        alt={`${name} profile`}
        className="member-card__photo"
        loading="lazy"
        onError={(event) => { event.currentTarget.src = '/assets/members/avatar.svg' }}
      />
      <div className="member-card__content">
        <div className="member-card__meta">
          <span className="member-card__role">{role}</span>
          {year && <Badge label={year} type="tag" />}
        </div>
        <h3 className="member-card__name">{name}</h3>
        <p className="member-card__bio">{bio}</p>
        <div className="member-card__links" aria-label={`${name} contact links`}>
          <IconLink href={linkedin} type="linkedin" label={`${name} LinkedIn`} />
          <IconLink href={email ? `mailto:${email}` : '#'} type="email" label={`Email ${name}`} />
        </div>
      </div>
    </article>
  )
}

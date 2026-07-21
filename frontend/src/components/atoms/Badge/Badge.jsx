import React from 'react'
import './Badge.css'

/**
 * @param {'Gold'|'Silver'|'Bronze'|'Easy'|'Medium'|'Hard'|'Active'|'Closed'|string} label
 * @param {'difficulty'|'status'|'award'|'tag'} type
 */
export default function Badge({ label, type = 'tag' }) {
  const slug = label?.toLowerCase().replace(/\s+/g, '-') ?? ''
  return (
    <span className={`badge badge--${type} badge--${slug}`}>
      {label}
    </span>
  )
}

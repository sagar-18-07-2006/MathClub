import React from 'react'
import './NavLink.css'

export default function NavLink({ href, children, onClick }) {
  return (
    <a href={href} className="nav-link" onClick={onClick}>
      {children}
    </a>
  )
}

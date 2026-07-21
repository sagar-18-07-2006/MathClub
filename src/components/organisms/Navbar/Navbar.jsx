import React, { useState, useEffect } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import Logo from '../../atoms/Logo/Logo.jsx'
import './Navbar.css'
import '../../molecules/NavLink/NavLink.css'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Problems', to: '/problems' },
  
  { label: 'Blog', to: '/blog' },
  { label: 'Team', to: '/team' },
  { label: 'Developers', to: '/developers' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        <Logo />
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} role="list">
          {navItems.map((item) => (
            <li key={item.to}>
              <RouterNavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} onClick={closeMenu}>
                {item.label}
              </RouterNavLink>
            </li>
          ))}
        </ul>
        <button className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>
      </nav>
    </header>
  )
}

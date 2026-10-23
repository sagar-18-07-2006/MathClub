import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../atoms/Logo/Logo.css'
import './FloatingNavbar.css'

/* Each item has a math glyph, shown in the mobile drawer. */
const navItems = [
  { label: 'Home',       to: '/',           glyph: '∑',    end: true },
  { label: 'Events',     to: '/events',     glyph: 'π' },
  { label: 'Problems',   to: '/problems',   glyph: '∫' },
  { label: 'Blog',       to: '/blog',       glyph: 'φ' },
  { label: 'Team',       to: '/team',       glyph: '∞' },
  { label: 'Developers', to: '/developers', glyph: '</>' },
]

const MOBILE_BREAKPOINT = 900 // keep in sync with the CSS media query

const isItemActive = (item, pathname) =>
  item.end ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + '/')

export default function FloatingNavbar() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hidden, setHidden] = useState(false)     // hide-on-scroll-down
  const [scrolled, setScrolled] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false })

  const listRef = useRef(null)
  const linkRefs = useRef([])
  const toggleRef = useRef(null)
  const closeRef = useRef(null)
  const lastY = useRef(0)

  const activeIndex = navItems.findIndex((item) => isItemActive(item, pathname))
  const targetIndex = hoverIndex ?? activeIndex

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  /* Sliding highlight: measure the target link */
  const measure = useCallback(() => {
    const el = linkRefs.current[targetIndex]
    if (!el || !listRef.current) return setPill((p) => ({ ...p, visible: false }))
    setPill({ x: el.offsetLeft, w: el.offsetWidth, visible: true })
  }, [targetIndex])

  useLayoutEffect(() => { measure() }, [measure, pathname])

  useEffect(() => {
    if (!listRef.current || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(listRef.current)
    document.fonts?.ready.then(measure) // re-measure once web fonts load
    return () => ro.disconnect()
  }, [measure])

  /* Scroll: add shadow, hide on scroll down, reveal on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 120)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on navigation */
  useEffect(() => { closeDrawer() }, [pathname, closeDrawer])

  /* Drawer behaviour: Escape, resize to desktop, scroll lock, focus handling */
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') { closeDrawer(); toggleRef.current?.focus() }
    }
    const onResize = () => { if (window.innerWidth > MOBILE_BREAKPOINT) closeDrawer() }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [drawerOpen, closeDrawer])

  return (
    <>
      <a href="#main-content" className="fnav-skip">Skip to content</a>

      {/* ── Floating pill (desktop links + mobile logo/toggle) ── */}
      <header
        className={[
          'fnav',
          scrolled && 'fnav--scrolled',
          hidden && !drawerOpen && 'fnav--hidden',
        ].filter(Boolean).join(' ')}
      >
        <nav className="fnav__pill" aria-label="Main navigation">
          <Link to="/" className="logo logo--md fnav__brand" aria-label="MathClub IIIT Raichur home">
            <svg className="logo__icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="19" stroke="var(--color-accent)" strokeWidth="1.5" />
              <path d="M27 12H14l8 8-8 8h13" stroke="var(--color-accent)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="logo__text">
              Math<span className="logo__text--accent">Club</span>
              <span className="logo__sub">IIIT Raichur</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="fnav__links" ref={listRef} onMouseLeave={() => setHoverIndex(null)}>
            <span
              className={`fnav__highlight ${pill.visible ? 'fnav__highlight--visible' : ''}`}
              style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
              aria-hidden="true"
            />
            {navItems.map((item, i) => {
              const active = i === activeIndex
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    ref={(el) => (linkRefs.current[i] = el)}
                    className={`fnav__link ${active ? 'fnav__link--active' : ''} ${targetIndex === i ? 'fnav__link--target' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="fnav__toggle"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="fnav-drawer"
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer (sibling of header: backdrop-filter would trap fixed children) ── */}
      <div
        className={`fnav__backdrop ${drawerOpen ? 'fnav__backdrop--visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        id="fnav-drawer"
        className={`fnav__drawer ${drawerOpen ? 'fnav__drawer--open' : ''}`}
        aria-label="Site menu"
      >
        <div className="fnav__drawer-head">
          <span className="fnav__drawer-title">Menu</span>
          <button ref={closeRef} type="button" className="fnav__close" onClick={closeDrawer} aria-label="Close menu">
            <span /><span />
          </button>
        </div>

        <ul className="fnav__drawer-list">
          {navItems.map((item, i) => {
            const active = i === activeIndex
            return (
              <li key={item.to} style={{ '--i': i }}>
                <Link
                  to={item.to}
                  className={`fnav__drawer-link ${active ? 'fnav__drawer-link--active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="fnav__glyph" aria-hidden="true">{item.glyph}</span>
                  <span className="fnav__drawer-label">{item.label}</span>
                  <span className="fnav__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="fnav__drawer-foot">Mathematics Club · IIIT Raichur</p>
      </aside>
    </>
  )
}
import React from 'react'
import { stats } from '../../../data/siteData.js'
import './StatsStrip.css'

export default function StatsStrip() {
  return <section className="stats-strip"><div className="container stats-strip__grid">{stats.map((s) => <div className="stats-strip__item" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></section>
}

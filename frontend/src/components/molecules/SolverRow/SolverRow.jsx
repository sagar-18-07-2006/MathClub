import React from 'react'
import Badge from '../../atoms/Badge/Badge.jsx'
import './SolverRow.css'

export default function SolverRow({ rank, name, branch, questionTitle, week, badge, totalSolved }) {
  const rankClass = rank <= 3 ? `solver-row__rank--top-${rank}` : ''

  return (
    <tr className="solver-row">
      <td className="solver-row__rank-cell">
        <span className={`solver-row__rank ${rankClass}`}>{rank}</span>
      </td>
      <td className="solver-row__name-cell">
        <span className="solver-row__name">{name}</span>
        <span className="solver-row__branch">{branch}</span>
      </td>
      <td className="solver-row__question-cell">
        <span className="solver-row__question-title">{questionTitle}</span>
        <span className="solver-row__week">{week}</span>
      </td>
      <td className="solver-row__badge-cell">
        {badge ? <Badge label={badge} type="award" /> : <span className="solver-row__no-badge">—</span>}
      </td>
      <td className="solver-row__count-cell">
        <span className="solver-row__count">{totalSolved}</span>
      </td>
    </tr>
  )
}

import React, { useMemo, useState } from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import Button from '../../atoms/Button/Button.jsx'
import SolverRow from '../../molecules/SolverRow/SolverRow.jsx'
import solvers from '../../../data/solvers.js'
import './LeaderboardSection.css'

export default function LeaderboardSection({ compact = false }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('totalSolved')

  const visibleSolvers = useMemo(() => {
    const filtered = solvers.filter((solver) =>
      `${solver.name} ${solver.branch} ${solver.questionTitle} ${solver.week}`.toLowerCase().includes(search.toLowerCase())
    )

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'rank') return a.rank - b.rank
      return b.totalSolved - a.totalSolved
    })
  }, [search, sortBy])

  return (
    <section className="leaderboard-section section section--alt" id="leaderboard">
      <div className="container">
        <SectionTitle
          eyebrow="Leaderboard"
          title="Problem Solvers"
          subtitle={compact ? 'A short home-page preview with a limited, scrollable height.' : 'Search and sort students who have submitted correct and complete solutions to weekly questions.'}
        />
        <div className="leaderboard-section__toolbar" aria-label="Leaderboard controls">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search solver, branch, or problem" aria-label="Search leaderboard" />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort leaderboard">
            <option value="totalSolved">Sort by total solved</option>
            <option value="rank">Sort by rank</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
        <div className={`leaderboard-section__table-wrap ${compact ? 'leaderboard-section__table-wrap--compact' : ''}`}>
          <table className="leaderboard-section__table" aria-label="Solver leaderboard">
            <thead>
              <tr className="leaderboard-section__thead-row">
                <th scope="col" className="leaderboard-section__th">Rank</th>
                <th scope="col" className="leaderboard-section__th">Student</th>
                <th scope="col" className="leaderboard-section__th">Question Solved</th>
                <th scope="col" className="leaderboard-section__th">Badge</th>
                <th scope="col" className="leaderboard-section__th">Total Solved</th>
              </tr>
            </thead>
            <tbody>
              {visibleSolvers.map((solver, index) => (
                <SolverRow key={solver.id} {...solver} rank={sortBy === 'totalSolved' ? index + 1 : solver.rank} />
              ))}
            </tbody>
          </table>
        </div>
        {compact && (
          <div className="section-action">
            <Button href="/leaderboard" variant="ghost">View Full Leaderboard</Button>
          </div>
        )}
      </div>
    </section>
  )
}

import React, { useMemo, useState } from 'react'
import SectionTitle from '../../atoms/SectionTitle/SectionTitle.jsx'
import SolverRow from '../../molecules/SolverRow/SolverRow.jsx'
import solvers from '../../../data/solvers.js'
import './Solvers.css'

export default function Solvers() {
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
    <section className="solvers section section--alt" id="solvers">
      <div className="container">
        <SectionTitle
          eyebrow="Leaderboard"
          title="Problem Solvers"
          subtitle="Search and sort students who have submitted correct and complete solutions to weekly questions."
        />
        <div className="solvers__toolbar" aria-label="Leaderboard controls">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search solver, branch, or problem" aria-label="Search leaderboard" />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort leaderboard">
            <option value="totalSolved">Sort by total solved</option>
            <option value="rank">Sort by rank</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
        <div className="solvers__table-wrap">
          <table className="solvers__table" aria-label="Solver leaderboard">
            <thead>
              <tr className="solvers__thead-row">
                <th scope="col" className="solvers__th">Rank</th>
                <th scope="col" className="solvers__th">Student</th>
                <th scope="col" className="solvers__th">Question Solved</th>
                <th scope="col" className="solvers__th">Badge</th>
                <th scope="col" className="solvers__th">Total Solved</th>
              </tr>
            </thead>
            <tbody>
              {visibleSolvers.map((s, index) => (
                <SolverRow key={s.id} {...s} rank={sortBy === 'totalSolved' ? index + 1 : s.rank} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

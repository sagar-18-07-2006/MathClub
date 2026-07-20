import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/organisms/Navbar/Navbar.jsx'
import Footer from './components/organisms/Footer/Footer.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import EventsPage from './pages/EventsPage/EventsPage.jsx'
import ProblemsPage from './pages/ProblemsPage/ProblemsPage.jsx'
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage.jsx'
import BlogPage from './pages/Blog/BlogPage.jsx'
import TeamPage from './pages/Team/TeamPage.jsx'
import DevelopersPage from './pages/Developers/DevelopersPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/weekly-problems" element={<Navigate to="/problems" replace />} />
        {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:teamSlug" element={<TeamPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

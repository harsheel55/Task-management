import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// Main application routes
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import Solutions from './pages/Solutions'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard.tsx'
import ProjectBoard from './pages/ProjectBoard.tsx'
import MembersPage from './pages/MembersPage.tsx'
import { AnalyticsPage } from './pages/AnalyticsPage.tsx'
import { AllTasksPage } from './pages/AllTasksPage.tsx'
import { NotificationsPage } from './pages/NotificationsPage.tsx'
import { ProfileSettings } from './pages/settings/ProfileSettings.tsx'
import { AccountSettings } from './pages/settings/AccountSettings.tsx'
import { NotificationSettings } from './pages/settings/NotificationSettings.tsx'
import { AppearanceSettings } from './pages/settings/AppearanceSettings.tsx'
import { SearchPage } from './pages/SearchPage.tsx'

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard' || location.pathname.startsWith('/project/') || location.pathname === '/tasks' || location.pathname === '/notifications' || location.pathname.startsWith('/settings/') || location.pathname === '/search'

  return (
    <div className="min-h-screen bg-background">
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<AllTasksPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/appearance" element={<AppearanceSettings />} />
        <Route path="/project/:id/board" element={<ProjectBoard />} />
        <Route path="/project/:id/members" element={<MembersPage />} />
        <Route path="/project/:id/analytics" element={<AnalyticsPage />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
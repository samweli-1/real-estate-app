import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import Agents from './pages/Agents'
import Inquiries from './pages/Inquiries'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <Header onMenuClick={toggleSidebar} />
        <main className="main-content">
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/inquiries" element={<Inquiries />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  )
}
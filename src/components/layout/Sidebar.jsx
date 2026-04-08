import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import './Sidebar.scss'

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Properties', path: '/properties', icon: <HomeIcon /> },
  { label: 'Agents', path: '/agents', icon: <PeopleIcon /> },
  { label: 'Inquiries', path: '/inquiries', icon: <QuestionAnswerIcon /> },
]

export default function Sidebar({ onToggle, isOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar__overlay" onClick={onToggle} />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <HomeIcon className="sidebar__logo-icon" />
          <span>RealEstate</span>
          <button className="sidebar__close" onClick={onToggle}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
              }
              onClick={() => window.innerWidth < 768 && onToggle()}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
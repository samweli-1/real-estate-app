import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import './Header.scss'

export default function Header({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <h2 className="header__title">Real Estate Management</h2>
      </div>

      <div className="header__right">
        {user && (
          <div className="header__user">
            <PersonIcon fontSize="small" />
            <span>{user.name}</span>
            <span className="header__role">{user.role}</span>
          </div>
        )}

        <button className="header__theme-btn" onClick={toggleTheme}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        <button className="header__logout-btn" onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
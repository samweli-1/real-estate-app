import { useTheme } from '../../context/ThemeContext'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.scss'

export default function Header({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <h2 className="header__title">Real Estate Management</h2>
      </div>

      <button className="header__theme-btn" onClick={toggleTheme}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  )
}
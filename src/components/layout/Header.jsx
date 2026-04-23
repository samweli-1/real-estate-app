import { AppBar, Button, Chip, IconButton, Toolbar, Typography } from '@mui/material'
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
    <AppBar position="fixed" color="transparent" elevation={0} className="header">
      <Toolbar className="header__toolbar">
        <div className="header__left">
          <IconButton className="header__menu-btn" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="header__title">
            Real Estate Management
          </Typography>
        </div>

        <div className="header__right">
          {user && (
            <Chip
              icon={<PersonIcon fontSize="small" />}
              label={`${user.name} (${user.role})`}
              variant="outlined"
              className="header__user"
            />
          )}

          <Button
            variant="outlined"
            color="inherit"
            startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            onClick={toggleTheme}
            className="header__theme-btn"
          >
            {isDark ? 'Light' : 'Dark'}
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            className="header__logout-btn"
          >
            <span className="header__logout-label">Logout</span>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

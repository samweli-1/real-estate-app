import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HomeIcon from '@mui/icons-material/Home'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ApartmentIcon from '@mui/icons-material/Apartment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import './Login.scss'

export default function Login() {
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setAuthError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const success = login(form.email, form.password)
      if (success) {
        navigate('/')
      } else {
        setAuthError('Invalid email or password')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="login-page">
      <IconButton onClick={toggleTheme} className="login-page__theme-btn">
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Card className="login-page__shell">
        <div className="login-page__brand">
          <div className="login-page__brand-logo">
            <HomeIcon />
          </div>
          <Typography variant="h3" className="login-page__brand-name">
            RwEstate
          </Typography>
          <Typography variant="h6" className="login-page__brand-tagline">
            Smarter real estate operations for modern teams
          </Typography>
          <Typography variant="body1" className="login-page__brand-copy">
            Manage listings, monitor inquiries, and coordinate agents from one clear workspace designed
            for fast daily execution.
          </Typography>

          <div className="login-page__points">
            <div className="login-page__point">
              <ApartmentIcon />
              <span>Unified property management dashboard</span>
            </div>
            <div className="login-page__point">
              <TrendingUpIcon />
              <span>Data-driven insights for better decisions</span>
            </div>
            <div className="login-page__point">
              <SupportAgentIcon />
              <span>Simple collaboration between admins and agents</span>
            </div>
          </div>
        </div>

        <CardContent className="login-page__content">
          <Stack spacing={2.5} component="form" onSubmit={handleSubmit}>
            <div className="login-page__intro">
              <Typography variant="h4">Welcome back</Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to continue to RwEstate
              </Typography>
            </div>

            {authError && <Alert severity="error">{authError}</Alert>}

            <TextField
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="admin@realty.rw"
              fullWidth
              size="medium"
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              placeholder="••••••••"
              fullWidth
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutlinedIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="login-page__hint">
              <Typography variant="caption" className="login-page__hint-title" display="block">
                Demo Accounts
              </Typography>
              <div className="login-page__hint-row">
                <CheckCircleOutlineIcon fontSize="inherit" />
                <span>Admin: admin@realty.rw</span>
              </div>
              <div className="login-page__hint-row">
                <CheckCircleOutlineIcon fontSize="inherit" />
                <span>Agent: alice@realty.rw</span>
              </div>
              <div className="login-page__hint-row">
                <CheckCircleOutlineIcon fontSize="inherit" />
                <span>Password: realty123</span>
              </div>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

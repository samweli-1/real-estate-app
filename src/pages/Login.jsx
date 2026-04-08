import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HomeIcon from '@mui/icons-material/Home'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
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
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
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
    <div className="login">
      {/* Theme toggle top right */}
      <button className="login__theme-btn" onClick={toggleTheme}>
        {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </button>

      <div className="login__card">
        {/* Logo */}
        <div className="login__logo">
          <HomeIcon sx={{ fontSize: 36 }} />
        </div>

        <h1 className="login__title">Welcome back</h1>
        <p className="login__subtitle">Sign in to your RealEstate account</p>

        {/* Auth error */}
        {authError && (
          <div className="login__error">
            {authError}
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label>Email address</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@realty.rw"
              className={errors.email ? 'input--error' : ''}
            />
            {errors.email && <span className="login__field-error">{errors.email}</span>}
          </div>

          <div className="login__field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'input--error' : ''}
            />
            {errors.password && <span className="login__field-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="login__submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Hint credentials */}
        <div className="login__hint">
          <p><strong>Admin:</strong> admin@realty.rw</p>
          <p><strong>Agent:</strong> alice@realty.rw</p>
          <p><strong>Password:</strong> realty123</p>
        </div>
      </div>
    </div>
  )
}
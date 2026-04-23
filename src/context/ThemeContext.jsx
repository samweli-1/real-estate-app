import { createContext, useState, useContext, useMemo, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'

const ThemeContext = createContext()

const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#FE2C55' },
      secondary: { main: '#25F4EE' },
      error: { main: '#FE2C55' },
      warning: { main: '#f59e0b' },
      success: { main: '#22c55e' },
    },
    typography: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    shape: { borderRadius: 12 },
  })

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={{ isDark: mode === 'dark', toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={mode === 'dark' ? 'app dark' : 'app light'}>{children}</div>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

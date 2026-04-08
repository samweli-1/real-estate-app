import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null
  })

  const login = (email, password) => {
    // Hardcoded credentials
    const validUsers = [
      { id: 1, name: "Admin User", email: "admin@realty.rw", role: "Admin" },
      { id: 2, name: "Alice Uwera", email: "alice@realty.rw", role: "Agent" },
    ]

    const found = validUsers.find(
      u => u.email === email && password === "realty123"
    )

    if (found) {
      localStorage.setItem('user', JSON.stringify(found))
      setUser(found)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
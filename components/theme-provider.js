'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const ThemeContext = createContext()

export function ThemeProvider({ children, defaultTheme = 'dark' }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [cookies, setCookie] = useCookies(['theme'])

  useEffect(() => {
    const savedTheme = cookies.theme || defaultTheme
    setTheme(savedTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(savedTheme)
  }, [cookies.theme, defaultTheme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    setCookie('theme', newTheme, { 
      path: '/',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60 // 1 year
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 
'use client'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useDarkMode = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(defaultTheme)
  const [cookies, setCookie] = useCookies(['theme'])

  // Initialize theme from cookie or default
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

  return { theme, toggleTheme }
}

export default useDarkMode
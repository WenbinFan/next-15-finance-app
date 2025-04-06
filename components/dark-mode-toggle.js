'use client'

import { useState, useEffect } from 'react'
import useDarkMode from '@/hooks/use-dark-mode'
import Button from './button'
import {Moon, Sun} from 'lucide-react'

export default function DarkModeToggle({defaultMode = 'dark'}) {
  const [mounted, setMounted] = useState(false)
  const {theme, toggleTheme} = useDarkMode(defaultMode)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <Button variant="ghost" size="sm" disabled>
      <div className="w-6 h-6" />
    </Button>
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === 'dark' && <Sun className="w-6 h-6" />}
      {theme === 'light' && <Moon className="w-6 h-6" />}
    </Button>
  )
}
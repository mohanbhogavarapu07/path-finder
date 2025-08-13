import { createContext, useContext, useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'

type ThemeContextType = ReturnType<typeof useTheme>

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  useEffect(() => {
    // Apply initial theme on mount
    const root = document.documentElement
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
    
    if (savedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.toggle('dark', systemTheme === 'dark')
    } else if (savedTheme) {
      root.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

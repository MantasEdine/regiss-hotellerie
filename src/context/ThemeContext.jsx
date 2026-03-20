/*
  context/ThemeContext.jsx
  ─────────────────────────────────────────────
  LESSON: React Context
  
  Problem without Context:
    If App has darkMode state and Navbar needs it,
    and Navbar > Button also needs it, you'd have to
    pass it as props through every level. This is "prop drilling"
    and gets messy fast.
  
  Solution — Context:
    1. Create a Context object (like a "signal broadcast")
    2. Wrap your app in a Provider (the "broadcaster")
    3. Any component anywhere calls useTheme() to "tune in"
       No prop drilling needed!
  
  How dark mode actually works with Tailwind:
    tailwind.config.js has `darkMode: 'class'`
    This means Tailwind applies dark: variants when
    the <html> element has the class "dark" on it.
    
    We toggle document.documentElement.classList.toggle('dark')
    to switch between modes.
    
    localStorage persists the preference across page reloads.
*/
import { createContext, useContext, useEffect, useState } from 'react'

// Step 1: Create the context with a default value
// The default is only used if a component is outside the Provider
const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
})

// Step 2: The Provider component
// It wraps the app and "provides" the context value to all descendants
export function ThemeProvider({ children }) {
  /*
    Initialize from localStorage so the preference persists.
    () => ... is a "lazy initializer" — the function runs only
    once on first render, not on every re-render.
    This is an optimization for expensive initial computations.
  */
  const [dark, setDark] = useState(() => {
    // localStorage is the browser's key-value store (persists across sessions)
    const saved = localStorage.getItem('regiis-dark')
    return saved ? JSON.parse(saved) : false
  })

  /*
    useEffect syncs our state with the DOM and localStorage.
    Whenever `dark` changes, this effect runs.
    [dark] is the dependency array — it re-runs only when dark changes.
  */
  useEffect(() => {
    const root = document.documentElement // <html> element
    if (dark) {
      root.classList.add('dark')     // enables dark: Tailwind classes
    } else {
      root.classList.remove('dark')  // removes them
    }
    // Persist to localStorage
    localStorage.setItem('regiis-dark', JSON.stringify(dark))
  }, [dark])

  const toggleDark = () => setDark(prev => !prev)

  // Step 2b: Return the Provider wrapping children
  // value prop is what gets shared with all consumers
  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 3: Custom hook to consume the context
// Any component calls: const { dark, toggleDark } = useTheme()
export function useTheme() {
  return useContext(ThemeContext)
}

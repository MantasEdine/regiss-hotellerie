/*
  App.jsx — Root component
  ─────────────────────────────────────────────
  LESSON: React Router v6 — Routes & Route
  
  React Router v6 works like this:
  
    <Routes>               ← looks at the current URL
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  
  When the URL is "/services", React Router renders <Services />.
  When it's "/", it renders <Home />.
  No page reload — just swapping components.
  
  <Routes> must be inside <BrowserRouter> (set up in main.jsx).
  
  LESSON: AnimatePresence + useLocation for page transitions
  
  For exit animations to work on route changes, we need:
    1. useLocation() — gives us the current URL path
    2. <AnimatePresence mode="wait"> — waits for exit animation
       before mounting the next page
    3. key={location.pathname} — changing key tells React this
       is a NEW element (triggers mount/unmount animations)
  
  LESSON: ThemeProvider placement
  
  ThemeProvider wraps everything so ALL components can access
  the dark/light state via useTheme() — no prop drilling needed.
  It must wrap Navbar, all pages, and Footer.
*/
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home     from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About    from './pages/About.jsx'
import Reviews  from './pages/Reviews.jsx'
import Contact  from './pages/Contact.jsx'

/*
  AnimatedRoutes is a separate component so it can call
  useLocation() — hooks must be called inside a component,
  and we need location to pass as the key to AnimatePresence.
*/
function AnimatedRoutes() {
  /*
    useLocation() returns the current location object.
    location.pathname is the URL path, e.g. "/services"
    
    We use it as the key on AnimatePresence's child so
    React detects a new element on every navigation,
    triggering the exit + enter animations.
  */
  const location = useLocation()

  return (
    /*
      mode="wait": don't mount the new page until the
      current page finishes its exit animation.
      Without this, both pages render simultaneously.
    */
    <AnimatePresence mode="wait" initial={false}>
      {/*
        key={location.pathname}: CRUCIAL for page transitions.
        React uses key to identify elements. When the key changes,
        React unmounts the old element (plays exit animation)
        and mounts the new one (plays enter animation).
        
        Without this key, React thinks it's the same element
        updating — no unmount, no exit animation.
      */}
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about"    element={<About />} />
        <Route path="/reviews"  element={<Reviews />} />
        <Route path="/contact"  element={<Contact />} />

        {/* 
          Catch-all 404 — * matches any unmatched path.
          In a real app you'd render a <NotFound /> page here.
        */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    /*
      ThemeProvider at the very top means every component
      in the tree can call useTheme() to get dark/toggleDark.
      
      This is the Context Provider pattern:
        ThemeProvider (broadcasts theme state)
          └── Navbar (reads it for the toggle button)
          └── Every page (uses dark: Tailwind classes)
          └── Footer (reads it if needed)
    */
    <ThemeProvider>
      {/*
        min-h-screen: page fills at least the full viewport height.
        flex flex-col: stacks Navbar, main content, Footer vertically.
        
        bg-white / dark:bg-stone-950: the base background color.
        The dark: prefix activates when <html> has class="dark",
        which ThemeContext manages.
        
        transition-colors duration-300: smooth background transition
        when toggling dark mode — no jarring flash.
      */}
      <div className="min-h-screen flex flex-col bg-white dark:bg-stone-950 transition-colors duration-300">
        {/* Navbar is always visible — outside the animated routes */}
        <Navbar />

        {/*
          flex-1 makes this <main> grow to fill remaining vertical space.
          This pushes the Footer to the bottom even on short pages.
          (This is the "sticky footer" pattern with flexbox.)
        */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        {/* Footer is always visible */}
        <Footer />
      </div>
    </ThemeProvider>
  )
}

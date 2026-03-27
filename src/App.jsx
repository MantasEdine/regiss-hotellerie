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
         <WhatsAppButton /> 
      </div>
    </ThemeProvider>
  )
}
function WhatsAppButton() {
  return (
    <a                   
      href="https://wa.me/33652920387"
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}
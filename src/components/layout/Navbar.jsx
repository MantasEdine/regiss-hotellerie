import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../../data/index.js'
import { useTheme } from '../../context/ThemeContext.jsx'
import { Button } from '../ui/index.jsx'

// ── The actual diamond image embedded as base64 ──
// Same diamond from your original logo PNG, background removed
const DIAMOND_IMG = "./file.svg"
export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { dark, toggleDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const goContact = () => {
    navigate('/contact')
    setSidebarOpen(false)
  }

  return (
    <>
      {/* ── TOPBAR ── */}
      <div className="bg-mauve-700 dark:bg-mauve-900 px-4 md:px-16 py-2 flex flex-wrap justify-between items-center gap-1">
        <p className="text-mauve-200 text-[11px]">
  Permanence 24h/24 · 7j/7 —{' '}
  <a href="tel:+33652920387" className="hover:text-white transition-colors">
    📞 +33 6 52 92 03 87
  </a>
  {' · '}
  <a href="https://wa.me/33652920387" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
    💬 WhatsApp
  </a>
</p>
        <div className="flex gap-4 text-[11px] text-mauve-200">
          <button onClick={goContact} className="hover:text-white transition-colors">
            contact@regiis.fr
          </button>
          <span className="opacity-30">|</span>
          <Link to="#" className="hover:text-white transition-colors">Recrutement</Link>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shadow-sm transition-colors duration-300">
        <div className="px-4 md:px-16 h-16 flex items-center justify-between">

          <Link to="/" className="flex-shrink-0">
            <NavLogo />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={[
                  'text-[12.5px] font-medium pb-0.5 border-b-2 transition-all duration-150',
                  isActive(item.path)
                    ? 'text-mauve-700 dark:text-mauve-300 border-mauve-600 dark:border-mauve-400'
                    : 'text-stone-500 dark:text-stone-400 border-transparent hover:text-mauve-600 dark:hover:text-mauve-400 hover:border-mauve-300',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-base hover:border-mauve-400 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={dark ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? '☀️' : '🌙'}
                </motion.span>
              </AnimatePresence>
            </button>

            <Button variant="mauve" size="sm" onClick={goContact} className="hidden md:flex">
              Devis gratuit
            </Button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Menu"
              className="md:hidden flex flex-col gap-[5px] p-2"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="block w-5 h-0.5 bg-stone-800 dark:bg-stone-200 rounded-full"
                  animate={
                    sidebarOpen
                      ? i === 0 ? { rotate: 45, y: 7 }
                      : i === 1 ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE SIDEBAR ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-900 z-50 flex flex-col shadow-2xl border-l border-stone-200 dark:border-stone-800 md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800">
                <NavLogoMini />
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDark}
                    className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-sm"
                  >
                    {dark ? '☀️' : '🌙'}
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-sm flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={[
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive(item.path)
                          ? 'bg-mauve-50 dark:bg-mauve-900/40 text-mauve-700 dark:text-mauve-300'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800',
                      ].join(' ')}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="my-2 border-t border-stone-100 dark:border-stone-800" />
                <Link
                  to="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <span className="text-base">💼</span> Recrutement
                </Link>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-stone-100 dark:border-stone-800">
                <div className="flex flex-col gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-4">
                  <span>📞 +33 6 52 92 03 87</span>
                  <span>✉️ contact@regiis.fr</span>
                  <span>🕐 24h/24 · 7j/7 · Jours fériés</span>
                </div>
                <Button variant="primary" className="w-full" onClick={goContact}>
                  Demander un devis →
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ── NavLogo — full logo with diamond + text (desktop navbar) ──
// size=48 → slightly bigger than before (was 32)
function NavLogo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={DIAMOND_IMG}
        alt="REGIIS logo"
        style={{
          height: '48px',
          width: 'auto',
          display: 'block',
          /* The cropped PNG has some transparent space at the bottom.
             translateY moves the image up so the diamond sits
             visually centred next to the text. */
          transform: 'none',
        }}
      />
      <div className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold text-stone-900 dark:text-white tracking-tight">
          REGIIS <span className="text-mauve-600 dark:text-mauve-300">HÔTELLERIE</span>
        </span>
        <span className="text-[7px] font-bold tracking-[3px] uppercase text-mauve-600 dark:text-mauve-400 mt-0.5">
          Solutions hôtelières · 24h/24
        </span>
      </div>
    </div>
  )
}

function NavLogoMini() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={DIAMOND_IMG}
        alt="REGIIS logo"
        style={{
          height: '40px',
          width: 'auto',
          display: 'block',
          transform: 'none',
        }}
      />
      <span className="text-[14px] font-extrabold text-stone-900 dark:text-white">
        REGIIS <span className="text-mauve-600 dark:text-mauve-300">HÔTELLERIE</span>
      </span>
    </div>
  )
}
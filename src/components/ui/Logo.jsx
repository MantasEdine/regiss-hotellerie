/*
  Logo.jsx
  ─────────────────────────────────────────────
  SVG recreation of the REGIIS diamond/gem logo.
  Using an SVG component instead of an <img> tag has
  several advantages:
    1. Scales perfectly at any size (vector, not pixels)
    2. We can control colors via props (e.g. dark mode)
    3. No extra HTTP request to load an image file
  
  Props:
    size   — height in pixels (width scales proportionally)
    inline — if true, shows diamond + text side by side
             if false, shows diamond only (footer/favicon use)
*/
export default function Logo({ size = 40, inline = true }) {
  return (
    <div className={inline ? "flex items-center gap-2.5" : "flex flex-col items-center gap-2"}>
      {/* ── Diamond SVG ── */}
      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient gives the gem its 3D sheen */}
          <linearGradient id="gemGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="gemGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
          <linearGradient id="gemGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f5d0fe" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        {/* Top-left facet */}
        <polygon points="20,35 60,10 60,45" fill="url(#gemGrad2)" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Top-right facet */}
        <polygon points="100,35 60,10 60,45" fill="url(#gemGrad1)" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Top-center facet */}
        <polygon points="35,35 60,10 85,35 60,45" fill="url(#gemGrad3)" stroke="#1a1a1a" strokeWidth="1.5" />

        {/* Bottom-left facet */}
        <polygon points="20,35 60,45 35,80" fill="url(#gemGrad1)" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Bottom-right facet */}
        <polygon points="100,35 60,45 85,80" fill="url(#gemGrad2)" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Bottom-center facet */}
        <polygon points="35,80 60,45 85,80 60,88" fill="url(#gemGrad3)" stroke="#1a1a1a" strokeWidth="1.5" />

        {/* Left side */}
        <polygon points="20,35 35,35 35,80" fill="url(#gemGrad1)" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Right side */}
        <polygon points="100,35 85,35 85,80" fill="url(#gemGrad2)" stroke="#1a1a1a" strokeWidth="1.5" />

        {/* Inner vertical line */}
        <line x1="60" y1="10" x2="60" y2="88" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Inner horizontal line */}
        <line x1="20" y1="35" x2="100" y2="35" stroke="#1a1a1a" strokeWidth="1.5" />
      </svg>

      {/* ── Wordmark ── */}
      {inline && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-extrabold text-white dark:text-white"
              style={{ fontSize: size * 0.45 + 'px', letterSpacing: '-0.5px' }}
            >
              REGIIS
            </span>
            <span
              className="font-extrabold text-orange-500"
              style={{ fontSize: size * 0.45 + 'px', letterSpacing: '-0.5px' }}
            >
              HÔTELLERIE
            </span>
          </div>
          <span
            className="font-semibold tracking-[3px] uppercase text-mauve-300"
            style={{ fontSize: size * 0.16 + 'px', marginTop: '2px' }}
          >
            Solutions hôtelières · 24h/24
          </span>
        </div>
      )}
    </div>
  )
}

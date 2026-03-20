/*
  components/ui/index.jsx
  ─────────────────────────────────────────────
  LESSON: Atomic Design
  
  "Atoms" are the smallest reusable building blocks.
  They have no business logic — just presentation.
  
  By grouping them in ui/index.jsx, importing is clean:
    import { Button, Badge, FormField } from '../ui'
  
  Each component here is designed to work in both
  light and dark mode using Tailwind's dark: prefix.
  dark:bg-stone-800 means "in dark mode, use bg-stone-800"
*/

import { motion } from 'framer-motion'

// ─────────────────────────────────────────
// BUTTON
// ─────────────────────────────────────────
/*
  Props:
    variant  → visual style ('primary' | 'secondary' | 'mauve' | 'ghost' | 'danger')
    size     → 'sm' | 'md' | 'lg'
    loading  → shows a spinner, disables click
    icon     → optional emoji/icon before label
    ...rest  → passes any other props (onClick, type, disabled, etc.)
              spread operator collects "the rest" of props
*/
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  ...rest
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    'dark:focus:ring-offset-stone-900',
  ].join(' ')

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  const variants = {
    primary:   'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400 shadow-sm hover:shadow',
    secondary: 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-mauve-400 hover:text-mauve-700 dark:hover:text-mauve-300 focus:ring-mauve-400',
    mauve:     'bg-mauve-700 hover:bg-mauve-800 text-white focus:ring-mauve-500 shadow-sm hover:shadow',
    ghost:     'text-white border border-white/30 hover:bg-white/10 focus:ring-white/50',
    danger:    'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        // CSS spinner — pure Tailwind, no library needed
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  )
}

// ─────────────────────────────────────────
// BADGE — colored pill label
// ─────────────────────────────────────────
export function Badge({ children, variant = 'mauve' }) {
  const variants = {
    mauve:  'bg-mauve-100 dark:bg-mauve-900 text-mauve-700 dark:text-mauve-300',
    orange: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400',
    green:  'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}

// ─────────────────────────────────────────
// TAG — smaller pill for lists
// ─────────────────────────────────────────
export function Tag({ children }) {
  return (
    <span className="text-[10px] font-semibold bg-mauve-50 dark:bg-mauve-900/50 text-mauve-600 dark:text-mauve-300 border border-mauve-100 dark:border-mauve-800 px-2.5 py-0.5 rounded-full">
      {children}
    </span>
  )
}

// ─────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────
export function StarRating({ count, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < count ? 'text-orange-400' : 'text-stone-200 dark:text-stone-700'}>
          ★
        </span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// SECTION TAG — tiny uppercase label
// ─────────────────────────────────────────
export function SectionTag({ children, color = 'orange' }) {
  const colors = {
    orange: 'text-orange-500',
    mauve:  'text-mauve-600 dark:text-mauve-400',
    white:  'text-orange-300',
  }
  return (
    <span className={`block text-[10px] font-bold tracking-[2.5px] uppercase mb-2 ${colors[color]}`}>
      {children}
    </span>
  )
}

// ─────────────────────────────────────────
// SECTION HEADER — centered heading block
// ─────────────────────────────────────────
export function SectionHeader({ tag, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <motion.div
      className={`mb-12 ${alignClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <SectionTag>{tag}</SectionTag>
      <h2
        className="text-3xl font-bold text-stone-900 dark:text-white mt-1"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">{subtitle}</p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────
// FORM FIELD — controlled input/select/textarea
// ─────────────────────────────────────────
/*
  A "controlled" input means React owns the value.
  value={value}      → React sets the displayed value
  onChange={onChange} → user typing calls this to update state
  
  If you only set value without onChange, the input is "read-only"
  and React will warn you. Always provide both.
*/
export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  required,
  rows = 4,
}) {
  const inputClass = [
    'w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-200',
    'bg-stone-50 dark:bg-stone-800',
    'border border-stone-200 dark:border-stone-700',
    'text-stone-800 dark:text-stone-200',
    'placeholder-stone-400 dark:placeholder-stone-500',
    'focus:outline-none focus:ring-2 focus:ring-mauve-400 dark:focus:ring-mauve-500 focus:border-transparent',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
        {label}
        {required && <span className="text-orange-500 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <select value={value} onChange={onChange} required={required} className={inputClass}>
          <option value="">-- Choisissez --</option>
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// PAGE HERO — inner page banner
// ─────────────────────────────────────────
export function PageHero({ breadcrumb, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-stone-50 dark:bg-stone-900 px-6 md:px-16 py-16 text-center border-b border-stone-200 dark:border-stone-800"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
        Accueil <span className="text-orange-500 mx-1">›</span> {breadcrumb}
      </p>
      <h1
        className="text-4xl font-bold text-stone-900 dark:text-white"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-3 max-w-md mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────
// URGENCY BANNER
// ─────────────────────────────────────────
export function UrgencyBanner({ onContactClick }) {
  return (
    <div className="bg-orange-500 px-6 md:px-16 py-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-white text-sm font-semibold">
        Besoin urgent de personnel ?{' '}
        <span className="font-normal opacity-85">Appelez-nous ou envoyez un WhatsApp</span>
      </p>
      <Button variant="ghost" size="sm" onClick={onContactClick}>
        +33 6 52 92 03 87
      </Button>
    </div>
  )
}

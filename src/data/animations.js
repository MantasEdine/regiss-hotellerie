/*
  data/animations.js
  ─────────────────────────────────────────────
  LESSON: Framer Motion Variants
  
  Instead of repeating animation props on every element,
  we define named "variants" once here and import them anywhere.
  
  A variant object maps state names → CSS-like properties.
  Framer Motion interpolates (tweens) between states smoothly.
  
  Common motion properties:
    opacity   0–1         (visibility)
    y         pixels      (vertical offset; negative = up)
    x         pixels      (horizontal offset)
    scale     multiplier  (0.5 = half size, 1.5 = 50% bigger)
    rotate    degrees
    filter    CSS filters (blur, brightness...)
  
  transition controls the animation physics:
    duration   seconds
    delay      seconds
    ease       easing curve name or bezier array
    type       "spring" | "tween" | "inertia"
    stiffness  spring stiffness (higher = snappier)
    damping    spring damping (higher = less bounce)
  
  staggerChildren: when used on a container variant,
  each child animates stagger seconds after the previous.
*/

// Fade up — the most common entrance animation
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Fade in only (no movement)
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

// Fade from right
export const fadeRight = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Scale up from slightly smaller
export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Card entrance with slight lift
export const cardVariant = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Container that staggers children
// When this parent animates to "visible", its children
// animate one by one, each 0.08s after the previous
export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Faster stagger for large grids
export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
}

// Page transition (used on route changes)
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

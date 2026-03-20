/*
  components/sections/index.jsx
  ─────────────────────────────────────────────
  "Molecule" and "Organism" level components.
  These are sections reused across multiple pages.
*/
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cardVariant, stagger, fadeUp } from '../../data/animations.js'
import { Badge, Tag, StarRating, SectionTag, FormField, Button } from '../ui/index.jsx'
import { useContactForm } from '../../hooks/useContactForm.js'
import { SERVICE_OPTIONS } from '../../data/index.js'

// ─────────────────────────────────────────
// SERVICE CARD — compact (for home preview)
// ─────────────────────────────────────────
export function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 hover:border-mauve-300 dark:hover:border-mauve-700 hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-10 h-10 bg-mauve-100 dark:bg-mauve-900/50 rounded-lg flex items-center justify-center text-xl mb-4">
        {service.icon}
      </div>
      <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-2">{service.name}</h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{service.desc}</p>
      <Badge variant="orange">{service.badge}</Badge>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// SERVICE FULL CARD — detailed (services page)
// ─────────────────────────────────────────
export function ServiceFullCard({ service }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 grid grid-cols-[auto_1fr] gap-5 items-start hover:border-mauve-300 dark:hover:border-mauve-700 transition-colors duration-200"
    >
      <div className="w-14 h-14 bg-mauve-100 dark:bg-mauve-900/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
        {service.icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">{service.name}</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{service.desc}</p>
        <div className="flex flex-wrap gap-2">
          {service.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// REVIEW CARD
// ─────────────────────────────────────────
export function ReviewCard({ review }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {review.initials}
        </div>
        <div>
          <StarRating count={review.stars} />
          <div className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">{review.author}</div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500">{review.role}</div>
        </div>
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-4">
        {review.text}
      </p>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// VALUE CARD — for About page
// ─────────────────────────────────────────
export function ValueCard({ value }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -3, scale: 1.02 }}
      className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 text-center"
    >
      <div className="text-3xl mb-3">{value.icon}</div>
      <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1">{value.title}</h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{value.desc}</p>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// CTA SECTION — reused on Home + Services + Reviews pages
// ─────────────────────────────────────────
export function CTASection() {
  const { fields, handleChange, handleSubmit, status, message } = useContactForm({
    contact: '', hotel: '', email: '', message: '',
  })

  const perks = [
    { icon: '⚡', text: "Réponse garantie en moins d'1h" },
    { icon: '🎁', text: 'Devis gratuit, sans engagement' },
    { icon: '📍', text: 'Intervention sur toute la France' },
    { icon: '✅', text: "Personnel disponible dès aujourd'hui" },
  ]

  return (
    <section className="bg-stone-50 dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-xl">

        {/* Left — purple panel */}
        <div className="bg-mauve-700 p-10 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/[0.03]" />
          <div className="relative z-10">
            <SectionTag color="white">Contactez-nous</SectionTag>
            <h2 className="text-3xl font-bold text-white leading-tight mt-1 mb-3">
              Un besoin urgent ?<br />
              <span className="text-orange-300">On est là.</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Remplacement de dernière minute, renfort planifié ou simple question — notre équipe répond en moins d&apos;une heure, 7 jours sur 7.
            </p>
            <div className="flex flex-col gap-4">
              {perks.map(p => (
                <div key={p.text} className="flex items-center gap-3 text-sm text-white/90">
                  <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                    {p.icon}
                  </div>
                  {p.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="p-10 bg-stone-50 dark:bg-stone-900">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-1">Envoyez-nous un message</h3>
          <p className="text-xs text-stone-400 mb-6">Notre équipe vous répond sous 1h</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Nom" value={fields.contact} onChange={handleChange('contact')} placeholder="Votre nom" required />
              <FormField label="Hôtel" value={fields.hotel} onChange={handleChange('hotel')} placeholder="Nom de l'hôtel" required />
            </div>
            <FormField label="Email" type="email" value={fields.email} onChange={handleChange('email')} placeholder="direction@hotel.fr" required />
            <FormField label="Message" type="textarea" value={fields.message} onChange={handleChange('message')} placeholder="Décrivez votre besoin..." required rows={4} />
            {message && (
              <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
            )}
            <Button type="submit" variant="primary" loading={status === 'loading'} className="w-full">
              Envoyer le message →
            </Button>
            <p className="text-center text-[10px] text-stone-400">Permanence 7j/7 — réponse rapide garantie</p>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// HOW IT WORKS SECTION
// ─────────────────────────────────────────
export function HowItWorksSection() {
  const steps = [
    { num: 1, title: 'Vous nous contactez', desc: 'Par formulaire, téléphone ou WhatsApp — 24h/24, 7j/7' },
    { num: 2, title: 'On analyse votre besoin', desc: 'Poste, délai, durée, exigences de votre établissement' },
    { num: 3, title: 'On sélectionne le profil', desc: 'Agent formé, disponible et adapté à vos standards' },
    { num: 4, title: 'Intervention rapide', desc: 'Votre équipe est renforcée. Vous gérez sereinement.' },
  ]
  return (
    <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <SectionTag>Comment ça marche</SectionTag>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white mt-1">
            Simple et <span className="text-mauve-600 dark:text-mauve-400">rapide</span>
          </h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(s => (
            <motion.div key={s.num} variants={cardVariant} className="text-center">
              <div className="w-12 h-12 bg-mauve-700 text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// FULL CONTACT FORM (Contact page)
// ─────────────────────────────────────────
export function ContactForm() {
  const { fields, handleChange, handleSubmit, status, message } = useContactForm({
    name: '', hotel: '', email: '', phone: '',
    service: '', delay: '', duration: '', message: '',
  })

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-lg"
    >
      <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-1">Formulaire de contact</h3>
      <p className="text-xs text-stone-400 mb-6">Devis gratuit · Sans engagement · Réponse en 1h</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Nom & Prénom" value={fields.name} onChange={handleChange('name')} placeholder="Jean Dupont" required />
          <FormField label="Nom de l'hôtel" value={fields.hotel} onChange={handleChange('hotel')} placeholder="Hôtel de la Paix" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Email" type="email" value={fields.email} onChange={handleChange('email')} placeholder="direction@hotel.fr" required />
          <FormField label="Téléphone" type="tel" value={fields.phone} onChange={handleChange('phone')} placeholder="+33 6 XX XX XX XX" />
        </div>
        <FormField label="Prestation souhaitée" type="select" value={fields.service} onChange={handleChange('service')} options={SERVICE_OPTIONS} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Délai" type="select" value={fields.delay} onChange={handleChange('delay')} options={["Aujourd'hui", 'Cette semaine', 'Ce mois', 'À planifier']} />
          <FormField label="Durée" type="select" value={fields.duration} onChange={handleChange('duration')} options={['1 jour', 'Quelques jours', '1 semaine', '1 mois+', 'Récurrent']} />
        </div>
        <FormField label="Message" type="textarea" value={fields.message} onChange={handleChange('message')} placeholder="Décrivez votre situation, vos exigences particulières..." required rows={5} />
        {message && (
          <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
        )}
        <Button type="submit" variant="mauve" loading={status === 'loading'} className="w-full" size="lg">
          Envoyer ma demande →
        </Button>
        <p className="text-center text-[10px] text-stone-400">
          En soumettant ce formulaire, vous acceptez d&apos;être contacté par REGIIS Hôtellerie.
        </p>
      </form>
    </motion.div>
  )
}

/*
  pages/Contact.jsx
*/
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONFIG } from '../data/index.js'
import { stagger, fadeUp, cardVariant, pageTransition } from '../data/animations.js'
import { PageHero, UrgencyBanner } from '../components/ui/index.jsx'
import { ContactForm } from '../components/sections/index.jsx'

export default function Contact() {
  const navigate = useNavigate()

  const contactCards = [
    { icon: '📞', label: 'Téléphone / WhatsApp', value: CONFIG.contact.phone, sub: 'Appel ou SMS, réponse immédiate' },
    { icon: '✉️', label: 'Email', value: CONFIG.contact.email, sub: 'Réponse garantie en moins d\'1h' },
    { icon: '🕐', label: 'Disponibilité', value: CONFIG.contact.hours, sub: 'Y compris jours fériés' },
    { icon: '⚡', label: 'Délai de réponse', value: 'Moins d\'1h garantie', sub: 'Même la nuit et le week-end' },
  ]

  return (
    <motion.div {...pageTransition}>
      <PageHero
        breadcrumb="Contact"
        title='Contactez-<span class="text-orange-500">nous</span>'
        subtitle="Notre équipe est disponible 24h/24, 7j/7. Réponse garantie en moins d'1h."
      />
      <UrgencyBanner onContactClick={() => {}} />

      <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — info cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-orange-500 block mb-2">
                Nos coordonnées
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3">
                Parlons de{' '}
                <span className="text-mauve-600 dark:text-mauve-400">votre besoin</span>
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8">
                Que vous ayez un remplacement urgent ou souhaitez anticiper vos besoins en personnel hôtelier, notre équipe est là pour vous accompagner.
              </p>
            </motion.div>

            <div className="flex flex-col gap-3">
              {contactCards.map(c => (
                <motion.div
                  key={c.label}
                  variants={cardVariant}
                  className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 flex items-center gap-4"
                >
                  <div className="w-11 h-11 bg-mauve-100 dark:bg-mauve-900/50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">
                      {c.label}
                    </div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-white">{c.value}</div>
                    <div className="text-[11px] text-stone-400 dark:text-stone-500">{c.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              variants={fadeUp}
              className="mt-6 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 h-40 bg-stone-100 dark:bg-stone-900 flex items-center justify-center"
            >
              <div className="text-center text-stone-400 dark:text-stone-600">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-xs font-medium">Intervention sur toute la France</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — full form */}
          <ContactForm />
        </div>
      </section>
    </motion.div>
  )
}

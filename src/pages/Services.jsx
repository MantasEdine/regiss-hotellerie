/*
  pages/Services.jsx
*/
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES } from '../data/index.js'
import { stagger, pageTransition } from '../data/animations.js'
import { PageHero, UrgencyBanner } from '../components/ui/index.jsx'
import { ServiceFullCard, CTASection } from '../components/sections/index.jsx'

export default function Services() {
  const navigate = useNavigate()
  return (
    <motion.div {...pageTransition}>
      <PageHero breadcrumb="Nos prestations" title='Nos <span class="text-orange-500">prestations</span> hôtelières' subtitle="7 métiers couverts par un seul interlocuteur, disponible 24h/24 et 7j/7" />
      <UrgencyBanner onContactClick={() => navigate('/contact')} />
      <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map(s => <ServiceFullCard key={s.id} service={s} />)}
          </motion.div>
        </div>
      </section>
      <CTASection />
    </motion.div>
  )
}

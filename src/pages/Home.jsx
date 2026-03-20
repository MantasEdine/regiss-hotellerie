/*
  pages/Home.jsx
  ─────────────────────────────────────────────
  LESSON: useNavigate + useEffect + useState together
  
  This page uses:
    useNavigate  → to redirect to /contact when clicking CTAs
    useState     → for the hero slideshow current index
    useEffect    → to auto-advance the slideshow on a timer
    useContactForm → our custom hook for the quick quote form
*/
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERVICES, REVIEWS, STATS, HOTEL_IMAGES } from '../data/index.js'
import { fadeUp, stagger, cardVariant, pageTransition } from '../data/animations.js'
import { Button, SectionHeader, UrgencyBanner, FormField } from '../components/ui/index.jsx'
import { ServiceCard, ReviewCard, CTASection, HowItWorksSection } from '../components/sections/index.jsx'
import { useContactForm } from '../hooks/useContactForm.js'

export default function Home() {
  const navigate = useNavigate()
  const [slideIdx, setSlideIdx] = useState(0)
  const { fields, handleChange, handleSubmit, status, message } = useContactForm({
    name: '', hotel: '', phone: '', service: '', delay: '',
  })

  // Auto-advance slideshow every 3.5 seconds
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HOTEL_IMAGES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="bg-stone-50 dark:bg-stone-900 min-h-[88vh] px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-colors">
        {/* Left — copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-mauve-100 dark:bg-mauve-900/60 text-mauve-700 dark:text-mauve-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-mauve-600 rounded-full animate-pulse" />
              Spécialiste du renfort hôtelier
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white leading-tight mb-4">
            Personnel hôtelier disponible{' '}
            <span className="text-mauve-600 dark:text-mauve-400">24h/24</span>, 7j/7
          </motion.h1>
          <motion.p variants={fadeUp} className="text-stone-500 dark:text-stone-400 text-base leading-relaxed mb-7 max-w-lg">
            REGIIS met à disposition des hôtels un personnel qualifié — réceptionnistes, sécurité, veilleurs, voituriers et plus. Intervention rapide, formés à vos standards.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-7">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>Demander un devis gratuit</Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/services')}>Découvrir nos services →</Button>
          </motion.div>
          <motion.div variants={stagger} className="flex flex-wrap gap-5">
            {['Réponse en 1h', 'Sans engagement', 'Personnel formé', 'Toute la France'].map(t => (
              <motion.div key={t} variants={fadeUp} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="w-5 h-5 bg-mauve-700 dark:bg-mauve-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">✓</span>
                {t}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — slideshow + quick form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
          {/* Slideshow */}
          <div className="relative rounded-2xl overflow-hidden h-52 mb-6 shadow-xl">
            {HOTEL_IMAGES.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="Hôtel"
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: i === slideIdx ? 1 : 0 }}
                transition={{ duration: 0.9 }}
              />
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HOTEL_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setSlideIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* Quick form */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-lg">
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-0.5">Demande de devis rapide</h3>
            <p className="text-[11px] text-stone-400 mb-5">Gratuit · Sans engagement · Réponse en 1h</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nom & Prénom" value={fields.name} onChange={handleChange('name')} placeholder="Jean Dupont" required />
                <FormField label="Hôtel" value={fields.hotel} onChange={handleChange('hotel')} placeholder="Nom de l'hôtel" required />
              </div>
              <FormField label="Téléphone" type="tel" value={fields.phone} onChange={handleChange('phone')} placeholder="+33 6 52 92 03 87" required />
              <FormField label="Besoin" type="select" value={fields.service} onChange={handleChange('service')}
                options={['Réceptionniste de jour','Réceptionniste de nuit','Veilleur de nuit','Agent de sécurité','Voiturier','Femme de chambre','Petit-déjeuner','Caméras / alarmes']} required />
              <FormField label="Délai souhaité" type="select" value={fields.delay} onChange={handleChange('delay')}
                options={["Aujourd'hui",'Cette semaine','Ce mois']} />
              {message && <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
              <Button type="submit" variant="mauve" loading={status === 'loading'} className="w-full">
                Envoyer ma demande →
              </Button>
              <p className="text-center text-[10px] text-stone-400">Permanence 7j/7 — réponse garantie en moins d&apos;1h</p>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
        className="bg-mauve-700 dark:bg-mauve-900 px-6 md:px-16 py-6 grid grid-cols-2 md:grid-cols-4 transition-colors">
        {STATS.map((s, i) => (
          <motion.div key={s.label} variants={cardVariant}
            className={`text-center py-2 ${i < STATS.length-1 ? 'border-r border-white/20' : ''}`}>
            <div className="text-3xl font-extrabold text-white">{s.value}</div>
            <div className="text-[11px] text-white/70 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
            className="relative rounded-2xl overflow-hidden h-80 shadow-xl">
            <img src={HOTEL_IMAGES[0]} alt="Hôtel" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Disponible</div>
              <div className="text-sm font-bold text-stone-900 dark:text-white">24h/24 · 7j/7</div>
            </div>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <motion.div variants={fadeUp}>
              <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-orange-500 mb-2 block">Qui sommes-nous</span>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
                Votre partenaire <span className="text-mauve-600 dark:text-mauve-400">opérationnel</span> de confiance
              </h2>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-4 text-sm">
                REGIIS accompagne les hôtels dans la gestion de leurs besoins en personnel. Face aux absences, pics d&apos;activité ou contraintes de recrutement, nous intervenons rapidement.
              </p>
            </motion.div>
            <motion.div variants={stagger} className="flex flex-col gap-3">
              {['Personnel formé aux standards hôteliers','Un seul interlocuteur pour tous vos postes','Intervention sous 24h, même en urgence','Présence sur site ou activation à distance'].map(item => (
                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300">
                  <span className="w-5 h-5 bg-mauve-100 dark:bg-mauve-900 rounded-full flex items-center justify-center text-mauve-700 dark:text-mauve-300 text-[10px] font-bold flex-shrink-0">✓</span>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="bg-stone-50 dark:bg-stone-900 px-6 md:px-16 py-20 transition-colors">
        <div className="max-w-5xl mx-auto">
          <SectionHeader tag="Nos prestations" title='Tout ce dont votre <span class="text-mauve-600 dark:text-mauve-400">hôtel a besoin</span>' subtitle="Un interlocuteur unique pour 7 métiers clés" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.slice(0, 6).map(s => <ServiceCard key={s.id} service={s} />)}
          </motion.div>
          <div className="text-center mt-8">
            <Button variant="primary" onClick={() => navigate('/services')}>Voir toutes nos prestations →</Button>
          </div>
        </div>
      </section>

      <HowItWorksSection />

      {/* ── REVIEWS PREVIEW ── */}
      <section className="bg-stone-50 dark:bg-stone-900 px-6 md:px-16 py-20 transition-colors">
        <div className="max-w-5xl mx-auto">
          <SectionHeader tag="Avis clients" title='Ils nous font <span class="text-mauve-600 dark:text-mauve-400">confiance</span>' subtitle="Ce que disent les directeurs d'hôtels" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.slice(0,3).map(r => <ReviewCard key={r.id} review={r} />)}
          </motion.div>
          <div className="text-center mt-8">
            <Button variant="secondary" onClick={() => navigate('/reviews')}>Voir tous les avis →</Button>
          </div>
        </div>
      </section>

      <CTASection />

      {/* ── URGENCY STRIP ── */}
      <UrgencyBanner onContactClick={() => navigate('/contact')} />
    </motion.div>
  )
}

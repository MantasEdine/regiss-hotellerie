/*
  pages/About.jsx
*/
import { motion } from 'framer-motion'
import { VALUES, HOTEL_IMAGES } from '../data/index.js'
import { stagger, fadeUp, pageTransition } from '../data/animations.js'
import { PageHero, SectionHeader } from '../components/ui/index.jsx'
import { ValueCard } from '../components/sections/index.jsx'

export default function About() {
  return (
    <motion.div {...pageTransition}>
      <PageHero breadcrumb="Qui sommes-nous" title='Qui sommes-<span class="text-orange-500">nous</span>' subtitle="REGIIS Hôtellerie — votre partenaire opérationnel de confiance" />

      <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors">
        <div className="max-w-5xl mx-auto">

          {/* Story block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="rounded-2xl overflow-hidden h-72 shadow-xl">
              <img src={HOTEL_IMAGES[1]} alt="REGIIS" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
              <motion.div variants={fadeUp}>
                <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-orange-500 block mb-2">Notre histoire</span>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  Nés du terrain, <span className="text-mauve-600 dark:text-mauve-400">pensés pour vous</span>
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-3">
                  REGIIS Hôtellerie est née d&apos;un constat simple : les hôtels font face à des besoins en personnel imprévisibles — absences de dernière minute, pics d&apos;activité, manque de ressources en pleine nuit.
                </p>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  Nous avons créé REGIIS pour être ce partenaire réactif, disponible à toute heure, avec des équipes réellement formées aux standards de l&apos;hôtellerie.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Approach block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
              <motion.div variants={fadeUp}>
                <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-orange-500 block mb-2">Notre approche</span>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  Un interlocuteur <span className="text-mauve-600 dark:text-mauve-400">unique</span>
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-3">
                  Chez REGIIS, vous avez un seul numéro pour couvrir 7 métiers différents. Nos agents sont sélectionnés pour leurs compétences et leur sens du service.
                </p>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  Chaque intervention est suivie et nous restons disponibles tout au long de la mission pour garantir votre satisfaction.
                </p>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="rounded-2xl overflow-hidden h-72 shadow-xl">
              <img src={HOTEL_IMAGES[2]} alt="REGIIS équipe" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Values grid */}
          <SectionHeader tag="Nos valeurs" title='Ce qui nous <span class="text-mauve-600 dark:text-mauve-400">distingue</span>' />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {VALUES.map(v => <ValueCard key={v.title} value={v} />)}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

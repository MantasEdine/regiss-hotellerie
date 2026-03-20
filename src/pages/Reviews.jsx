/*
  pages/Reviews.jsx
*/
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { REVIEWS } from '../data/index.js'
import { stagger, pageTransition } from '../data/animations.js'
import { PageHero } from '../components/ui/index.jsx'
import { ReviewCard, CTASection } from '../components/sections/index.jsx'

export default function Reviews() {
  const navigate = useNavigate()
  return (
    <motion.div {...pageTransition}>
      <PageHero
        breadcrumb="Avis clients"
        title='Avis <span class="text-orange-500">clients</span>'
        subtitle="Ce que disent les directeurs et responsables hôteliers qui travaillent avec nous"
      />

      <section className="bg-white dark:bg-stone-950 px-6 md:px-16 py-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {REVIEWS.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>

          {/* Rating summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            {/* Average score */}
            <div className="text-center">
              <div className="text-6xl font-extrabold text-stone-900 dark:text-white mb-1">4.9</div>
              <div className="flex justify-center gap-1 text-orange-400 text-xl mb-1">★★★★★</div>
              <div className="text-xs text-stone-400 dark:text-stone-500">Note moyenne</div>
            </div>

            {/* Rating breakdown */}
            <div className="col-span-2 flex flex-col gap-2">
              {[
                { stars: 5, count: 4, pct: 75 },
                { stars: 4, count: 2, pct: 25 },
                { stars: 3, count: 0, pct: 0 },
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="text-xs text-stone-500 dark:text-stone-400 w-12 flex-shrink-0">{row.stars} étoile{row.stars > 1 ? 's' : ''}</span>
                  <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                      className="h-full bg-orange-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-stone-400 dark:text-stone-500 w-6">{row.count}</span>
                </div>
              ))}
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                Basé sur {REVIEWS.length} avis vérifiés de directeurs d&apos;hôtels
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </motion.div>
  )
}

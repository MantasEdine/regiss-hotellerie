/*
  components/layout/Footer.jsx
*/
import { Link, useNavigate } from 'react-router-dom'
import { NAV_ITEMS, SERVICES } from '../../data/index.js'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 px-6 md:px-16 pt-14 pb-6 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand column */}
        <div>
          <div className="text-base font-extrabold text-white mb-3">
            REGIIS <span className="text-orange-500">HÔTELLERIE</span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed mb-5 max-w-[220px]">
            Solutions de renfort hôtelier disponibles 24h/24 et 7j/7. Personnel qualifié, formé aux standards hôteliers.
          </p>
          <div className="flex flex-col gap-2 text-xs text-stone-400">
            <span>📞 +33 6 52 92 03 87</span>
            <span>✉️ contact@regiis.fr</span>
            <span>🕐 24h/24 · 7j/7 · Jours fériés</span>
          </div>
          {/* Live status dot */}
          <div className="mt-4 bg-stone-800 border border-stone-700 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-stone-300 font-semibold mb-1">
              <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_6px_#4ade80] animate-pulse" />
              Disponible maintenant
            </div>
            <div className="text-[11px] text-stone-500">Réponse garantie en moins d&apos;1h</div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-stone-500 mb-4">Prestations</h4>
          <ul className="flex flex-col gap-2">
            {SERVICES.map(s => (
              <li key={s.id}>
                <button
                  onClick={() => navigate('/services')}
                  className="text-xs text-stone-400 hover:text-white transition-colors text-left"
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-stone-500 mb-4">Navigation</h4>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="text-xs text-stone-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="#" className="text-xs text-stone-400 hover:text-white transition-colors">Recrutement</Link>
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-stone-500 mb-4">Légal</h4>
          <ul className="flex flex-col gap-2 mb-6">
            {['Mentions légales', 'Politique de confidentialité', 'CGV', 'RGPD'].map(l => (
              <li key={l}>
                <Link to="#" className="text-xs text-stone-400 hover:text-white transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-stone-500 mb-3">Suivez-nous</h4>
          <div className="flex gap-2">
            {[{ label: 'in', name: 'LinkedIn' }, { label: 'f', name: 'Facebook' }, { label: 'ig', name: 'Instagram' }].map(s => (
              <button
                key={s.label}
                aria-label={s.name}
                className="w-8 h-8 bg-stone-800 border border-stone-700 rounded-lg flex items-center justify-center text-xs text-stone-400 hover:text-white hover:bg-stone-700 transition-all font-bold"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800 pt-5 flex flex-wrap justify-between items-center gap-3">
        <p className="text-[11px] text-stone-600">© 2025 REGIIS Hôtellerie · Tous droits réservés</p>
        <div className="flex gap-4 flex-wrap">
          {['Mentions légales', 'Confidentialité', 'CGV'].map(l => (
            <Link key={l} to="#" className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

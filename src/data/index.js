/*
  data/index.js
  ─────────────────────────────────────────────
  LESSON: Separating Data from UI
  
  All the app's "content" lives here, separate from components.
  This means:
    - Designers can update text without touching React code
    - Data could later come from an API/CMS with minimal changes
    - Components stay clean — they just display, not define content
  
  This is the "Data Layer" in a clean architecture.
*/

export const CONFIG = {
  emailjs: {
    serviceId:  'service_nczomam',   // From emailjs.com dashboard
    templateId: 'template_jvn04nn',
    publicKey:  'sN1C3awKCBiunWnbZ',
  },
  contact: {
    phone: '+33 6 52 92 03 87',
    email: 'contact@regiis.fr',
    hours: '24h/24 — 7j/7',
  },
}

export const NAV_ITEMS = [
  { id: 'home',     path: '/',         label: 'Accueil',         icon: '🏠' },
  { id: 'services', path: '/services', label: 'Nos prestations', icon: '🛎️' },
  { id: 'about',    path: '/about',    label: 'Qui sommes-nous', icon: '👥' },
  { id: 'reviews',  path: '/reviews',  label: 'Avis clients',    icon: '⭐' },
  { id: 'contact',  path: '/contact',  label: 'Contact',         icon: '✉️' },
]

export const SERVICES = [
  {
    id: 'receptioniste',
    icon: '🛎️',
    name: 'Réceptionnistes',
    desc: 'Accueil, gestion front desk, arrivées/départs. Formés aux logiciels hôteliers.',
    badge: 'Jour & nuit',
    tags: ['Logiciels hôteliers', 'Jour & nuit', '24h/24'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    id: 'securite',
    icon: '🛡️',
    name: 'Agents de sécurité',
    desc: 'Sécurité hôtelière. Présence physique ou intervention sur alarme.',
    badge: 'Sur site · À distance',
    tags: ['Sur site', 'À distance', 'Sur alarme'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  },
  {
    id: 'veilleur',
    icon: '🌙',
    name: 'Veilleurs de nuit',
    desc: 'Couverture nocturne complète. Sécurité et accueil tardif.',
    badge: 'Nuit complète',
    tags: ['Nuit complète', 'Sécurité', 'Accueil tardif'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
  },
  {
    id: 'voiturier',
    icon: '🚗',
    name: 'Voituriers',
    desc: 'Première impression mémorable à l\'entrée de votre établissement.',
    badge: 'Premium',
    tags: ['Premium', 'Première impression'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    id: 'chambre',
    icon: '🏨',
    name: 'Femmes de chambre',
    desc: 'Personnel de ménage discret et efficace. Renfort ponctuel ou régulier.',
    badge: 'Flexible',
    tags: ['Ponctuel', 'Long terme', 'Discret'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  },
  {
    id: 'dejeuner',
    icon: '☕',
    name: 'Petits-déjeuners',
    desc: 'Préparation et service du petit-déjeuner. Tôt le matin.',
    badge: 'Dès 5h du matin',
    tags: ['Dès 5h', 'Buffet & carte'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
  },
  {
    id: 'cameras',
    icon: '📹',
    name: 'Caméras & alarmes',
    desc: 'Installation et paramétrage de vidéosurveillance et d\'alarme.',
    badge: 'Installation',
    tags: ['Vidéosurveillance', 'Alarme'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
]

export const REVIEWS = [
  {
    id: 'marie',
    author: 'Marie L.',
    role: 'Directrice — Hôtel 4★, Paris',
    stars: 5,
    text: 'Intervention rapide suite à une absence imprévue. Le réceptionniste s\'est parfaitement adapté à nos procédures. Je recommande vivement.',
    initials: 'ML',
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    id: 'thomas',
    author: 'Thomas B.',
    role: 'Responsable RH — Chaîne hôtelière',
    stars: 5,
    text: 'REGIIS est devenu notre partenaire de référence. Réactivité et sérieux au rendez-vous à chaque fois.',
    initials: 'TB',
    gradient: 'from-orange-400 to-amber-600',
  },
  {
    id: 'sophie',
    author: 'Sophie K.',
    role: 'Gérante — Résidence hôtelière, Lyon',
    stars: 4,
    text: 'Très bon service. La veilleuse de nuit connaissait parfaitement les procédures. On renouvelle sans hésiter.',
    initials: 'SK',
    gradient: 'from-pink-400 to-rose-600',
  },
  {
    id: 'damien',
    author: 'Damien G.',
    role: 'Directeur — Boutique hôtel, Bordeaux',
    stars: 5,
    text: 'Nous avons souvent besoin de remplacements de dernière minute. REGIIS est toujours là, disponible et professionnel.',
    initials: 'DG',
    gradient: 'from-teal-400 to-emerald-600',
  },
  {
    id: 'ines',
    author: 'Inès D.',
    role: 'Responsable — Hôtel 5★, Nice',
    stars: 5,
    text: 'Le réceptionniste de nuit avait une vraie connaissance des procédures et un excellent sens du service client.',
    initials: 'ID',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'richard',
    author: 'Richard M.',
    role: 'Gérant — Hôtel indépendant, Marseille',
    stars: 4,
    text: 'L\'extra était ponctuel et s\'est rapidement adapté à notre établissement. Je recommande.',
    initials: 'RM',
    gradient: 'from-violet-400 to-fuchsia-600',
  },
]

export const STATS = [
  { value: '24/7',  label: 'Disponibilité permanente' },
  { value: '7',     label: 'Métiers couverts' },
  { value: '<1h',   label: 'Délai de réponse' },
  { value: '100%',  label: 'Personnel formé' },
]

export const VALUES = [
  { icon: '⚡', title: 'Réactivité',  desc: 'Réponse en moins d\'1h, 24h/24, 7j/7' },
  { icon: '🎯', title: 'Précision',   desc: 'Le bon profil pour le bon poste, formé à vos standards' },
  { icon: '🤝', title: 'Confiance',   desc: 'Un interlocuteur unique, transparent et engagé' },
  { icon: '🏆', title: 'Excellence',  desc: 'Standards hôteliers haut de gamme' },
  { icon: '🔄', title: 'Flexibilité', desc: 'Du ponctuel au long terme, on s\'adapte' },
  { icon: '📍', title: 'Proximité',   desc: 'Suivi personnalisé, disponibilité permanente' },
]

export const SERVICE_OPTIONS = [
  'Réceptionniste de jour', 'Réceptionniste de nuit', 'Veilleur de nuit',
  'Agent de sécurité', 'Voiturier', 'Femme de chambre',
  'Petit-déjeuner', 'Caméras / alarmes', 'Plusieurs prestations',
]

export const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=85',
]

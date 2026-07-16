import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};


const FEATURES = [
  {
    tag: 'Trouve ta salle',
    title: 'Séances disponibles, en temps réel',
    desc: 'Localise les salles autour de toi, consulte les séances du moment et rejoins un partenaire à ton niveau en quelques secondes.',
    points: ['Gyms géolocalisées', 'Sessions filtrées par type et niveau', 'Rejoindre ou créer en un tap'],
    image: '/spotmeScreenshot/homepage.png',
    reverse: false,
  },
  {
    tag: 'Messagerie',
    title: 'Parle avec ton partenaire en direct',
    desc: 'Messages instantanés pour coordonner avant la séance. Historique, notifications, zéro friction.',
    points: ['Chat temps réel', 'Coordination avant la séance', 'Historique des conversations'],
    image: '/spotmeScreenshot/messages.png',
    reverse: true,
  },
  {
    tag: 'Suivi & Progression',
    title: 'Suis tes progrès, reste motivé',
    desc: 'Calories, macros, activité quotidienne — tout centralisé. Records personnels, badges et streaks pour rester constant.',
    points: ['Calories & macros avec IA', 'Records personnels et badges', 'Streaks et système de niveaux'],
    image: '/spotmeScreenshot/nutrition.png',
    reverse: false,
  },
];

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
          transform: 'scale(1.4)',
        }}
      />
      <div
        className="relative rounded-[2.5rem] overflow-hidden flex-shrink-0"
        style={{
          width: 240,
          height: 480,
          border: '1px solid rgba(129,140,248,0.2)',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 60px rgba(129,140,248,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
      </div>
    </div>
  );
}

export function ProjectSpotme() {
  const project = projects.find((p) => p.slug === 'spotme')!;

  return (
    <div className="py-32">
      {/* Back */}
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <Link
          to="/projets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors font-mono text-sm tracking-wide rounded"
        >
          <ArrowLeft size={16} /> Projets
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
              Application Mobile
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={GRADIENT_TEXT}>
              SpotMe
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              L'app qui te trouve un partenaire d'entraînement dans ta salle de sport. Comme un BlaBlaCar du sport — tu crées une séance, un sportif te rejoint.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <NeonBadge key={tech} label={tech} color="indigo" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup src="/spotmeScreenshot/homepage.png" alt="SpotMe accueil" />
          </motion.div>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-28 mb-32">
          {FEATURES.map((feat) => (
            <div
              key={feat.tag}
              className={`flex flex-col ${feat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? 50 : -50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <PhoneMockup src={feat.image} alt={feat.tag} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? -50 : 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="flex flex-col gap-5 max-w-lg"
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-400">
                  {feat.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {feat.points.map((pt, j) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(129,140,248,0.15)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Profil screen standalone */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12 p-10 rounded-3xl"
          style={{
            background: 'rgba(129,140,248,0.04)',
            border: '1px solid rgba(129,140,248,0.12)',
          }}
        >
          <PhoneMockup src="/spotmeScreenshot/profil.png" alt="Profil SpotMe" />
          <div className="max-w-md">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-3 block">Profil</span>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Ton profil, tes stats</h3>
            <p className="text-slate-400 leading-relaxed">
              Progression du poids, records personnels, badges débloqués, streak de séances — tout est là pour te montrer à quel point tu avances.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
function BrowserMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
          transform: 'scale(1.3)',
        }}
      />
      <div
        className="relative rounded-xl overflow-hidden flex-shrink-0 w-full"
        style={{
          border: '1px solid rgba(129,140,248,0.2)',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 60px rgba(129,140,248,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2.5"
          style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <img src={src} alt={alt} className="w-full object-cover object-top" />
      </div>
    </div>
  );
}

const GUESTLY_FEATURES = [
  {
    tag: 'Associations',
    title: 'Une plateforme par association',
    desc: 'Créez votre espace association en quelques secondes. Gérez plusieurs associations depuis un seul compte, chacune avec ses événements et ses invités.',
    points: ['Création d\'association instantanée', 'Multi-associations par compte', 'Tableau de bord dédié'],
    image: '/guestlyScreenshot/homePage.png',
    reverse: false,
  },
  {
    tag: 'Création d\'événement',
    title: 'Créez un événement en 3 étapes',
    desc: 'Formulaire guidé en 3 étapes : description, invités, confirmation. Lieu, date, capacité maximale, date limite de réponse — tout est là.',
    points: ['Formulaire guidé étape par étape', 'Capacité maximale et date limite', 'Lien public partageable'],
    image: '/guestlyScreenshot/createEventPage.png',
    reverse: true,
  },
  {
    tag: 'Dashboard',
    title: 'Suivi des présences en temps réel',
    desc: 'Vue instantanée sur les présents, absents, peut-être et en attente. Export CSV, relance auto, scanner QR pour valider les entrées sur place.',
    points: ['Compteurs présents / absents / en attente', 'Relance automatique par email', 'Scanner QR à l\'entrée'],
    image: '/guestlyScreenshot/dashboardeventPage.png',
    reverse: false,
  },
];

export function ProjectGuestly() {
  const project = projects.find((p) => p.slug === 'guestly')!;

  return (
    <div className="py-32">
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <Link
          to="/projets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors font-mono text-sm tracking-wide rounded"
        >
          <ArrowLeft size={16} /> Projets
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
              Application Web SaaS
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={GRADIENT_TEXT}>
              Guestly
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Gestion d'invités et d'événements pour associations et BDE. Fini les tableurs Excel — formulaires d'inscription, invitations, relances et suivi des réponses dans une seule plateforme.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <NeonBadge key={tech} label={tech} color="indigo" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <BrowserMockup src="/guestlyScreenshot/eventsPage.png" alt="Guestly événements" />
          </motion.div>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-28">
          {GUESTLY_FEATURES.map((feat) => (
            <div
              key={feat.tag}
              className={`flex flex-col ${feat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
            >
              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? 50 : -50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full lg:w-1/2 flex-shrink-0"
              >
                <BrowserMockup src={feat.image} alt={feat.tag} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? -50 : 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="flex flex-col gap-5 max-w-lg"
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-400">
                  {feat.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {feat.points.map((pt, j) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(129,140,248,0.15)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const COCKPIT_FEATURES = [
  {
    tag: 'Dashboard',
    title: 'Tout ton quotidien en un coup d\'œil',
    desc: 'Énergie du jour, prochain bloc agenda, dernière séance sport, projets business actifs — tout centralisé sur un seul écran.',
    points: ['Énergie journalière (1→5)', 'Prochain bloc agenda intégré', 'Résumé sport et business'],
    image: '/cockpitScreenshot/homepage.PNG',
    reverse: false,
  },
  {
    tag: 'Sport',
    title: 'Log tes séances, construis tes enchainements',
    desc: 'Logger une séance en quelques taps. Crée des enchainements personnalisés (poings, pieds, défense, déplacement) étape par étape.',
    points: ['Log rapide post-séance', 'Éditeur de enchainements par étapes', 'Historique et durée des séances'],
    image: '/cockpitScreenshot/createComboPage.PNG',
    reverse: true,
  },
  {
    tag: 'Business',
    title: 'Tes projets, tes leads, tes revenus',
    desc: 'Suis l\'avancement de chaque projet freelance : statut, prochaine action, leads à relancer, revenus en cours. Garde la vision et la main mise sur tout tes clients.',
    points: ['Projets Actif / Pause / Terminé', 'Leads à relancer avec alerte', 'Suivi des revenus par projet'],
    image: '/cockpitScreenshot/businessPage.png',
    reverse: false,
  },
];

export function ProjectCockpit() {
  const project = projects.find((p) => p.slug === 'cockpit')!;

  return (
    <div className="py-32">
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <Link
          to="/projets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors font-mono text-sm tracking-wide rounded"
        >
          <ArrowLeft size={16} /> Projets
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
              Application iOS — SwiftUI
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={GRADIENT_TEXT}>
              Cockpit
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Le cockpit de ta vie personnelle. Sport, business, agenda et notes — une seule app iOS pour piloter ta journée sans te disperser.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <NeonBadge key={tech} label={tech} color="indigo" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup src="/cockpitScreenshot/calendarPage.PNG" alt="Cockpit calendrier" />
          </motion.div>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-28">
          {COCKPIT_FEATURES.map((feat) => (
            <div
              key={feat.tag}
              className={`flex flex-col ${feat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? 50 : -50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <PhoneMockup src={feat.image} alt={feat.tag} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? -50 : 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="flex flex-col gap-5 max-w-lg"
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-400">
                  {feat.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {feat.points.map((pt, j) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(129,140,248,0.15)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const AREA_FEATURES = [
  {
    tag: 'Actions',
    title: 'Crée tes automatisations en quelques clics',
    desc: 'Déclenche une action sur un service dès qu\'un événement se produit sur un autre. Sélectionne le déclencheur, configure les paramètres, active — c\'est tout.',
    points: ['Interface drag-and-drop', 'Déclencheurs configurables', 'Actions paramétrables par service'],
    image: '/areaScreenshot/actionPage.png',
    reverse: false,
  },
  {
    tag: 'Connecteurs',
    title: 'Tes services préférés, tous connectés',
    desc: 'Discord, GitHub, Gmail, Twitch, Météo — connecte tes comptes OAuth en un clic et combine leurs événements librement.',
    points: ['OAuth sécurisé par service', 'Discord, GitHub, Gmail intégrés', 'Ajout de connecteurs sans redéploiement'],
    image: '/areaScreenshot/connectorPage.png',
    reverse: true,
  },
  {
    tag: 'Dashboard',
    title: 'Surveille tes workers en temps réel',
    desc: 'Chaque automatisation tourne en arrière-plan sur un worker Docker dédié. Statut, dernière exécution, logs — visibles d\'un coup d\'œil.',
    points: ['Workers Docker isolés', 'Logs d\'exécution par automation', 'Activation / désactivation instantanée'],
    image: '/areaScreenshot/homePage.png',
    reverse: false,
  },
];

export function ProjectArea() {
  const project = projects.find((p) => p.slug === 'area')!;

  return (
    <div className="py-32">
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <Link
          to="/projets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors font-mono text-sm tracking-wide rounded"
        >
          <ArrowLeft size={16} /> Projets
        </Link>
      </div>

      {/* Hero */}
      <div className="px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
              Automatisation Web — IFTTT
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={GRADIENT_TEXT}>
              AREA
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Connecte tes services et automatise tes workflows. Discord réagit à un push GitHub, Gmail t'alerte quand Twitch est live — compose tes propres règles sans écrire une ligne.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <NeonBadge key={tech} label={tech} color="indigo" />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <BrowserMockup src="/areaScreenshot/homePage.png" alt="AREA dashboard" />
          </motion.div>
        </div>

        {/* Feature rows */}
        <div className="flex flex-col gap-28">
          {AREA_FEATURES.map((feat) => (
            <div
              key={feat.tag}
              className={`flex flex-col ${feat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
            >
              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? 50 : -50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full lg:w-1/2 flex-shrink-0"
              >
                <BrowserMockup src={feat.image} alt={feat.tag} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: feat.reverse ? -50 : 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="flex flex-col gap-5 max-w-lg"
              >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-400">
                  {feat.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {feat.points.map((pt, j) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(129,140,248,0.15)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-300">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

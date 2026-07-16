import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const SKILLS = {
  Langages: { items: ['C / C++20', 'JavaScript', 'TypeScript', 'Python', 'HTML / CSS'], color: 'indigo' as const },
  Frameworks: { items: ['React', 'FastAPI', 'Node.js'], color: 'cyan' as const },
  Outils: {
    items: ['Git / GitHub', 'Docker', 'PostgreSQL', 'CI/CD GitHub Actions', 'Linux'],
    color: 'default' as const,
  },
};

const LANGUAGES = [
  { lang: 'Français', level: 'Natif' },
  { lang: 'Anglais', level: 'C1' },
  { lang: 'Allemand', level: 'Scolaire' },
];

export function About() {
  return (
    <div className="px-6 py-32 max-w-4xl mx-auto">
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
        À propos
      </span>
      <h1
        className="text-4xl md:text-6xl font-black tracking-tight mb-12"
        style={GRADIENT_TEXT}
      >
        Qui je suis
      </h1>

      {/* Bio */}
      <div className="mb-16 space-y-4">
        <p className="text-slate-300 text-lg leading-relaxed">
          Développeur freelance basé à Nantes, je construis des applications web, des applications mobiles pour des
          clients qui veulent du concret — de la première ligne de code au déploiement en
          production. Je fais aussi des refontes de sites web, des automatisations pour rendre les entreprises plus efficaces et des sites d'ecommerce.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Développeur freelance | Sites vitrine, e-commerce & applications sur-mesure
          <br />
          <br />
          Développeur full-stack formé à Epitech, classée 1ère école du digital et du numérique en France (Le Figaro Étudiant, 2026), je conçois et livre des sites vitrine, boutiques e-commerce et applications sur-mesure pour indépendants, associations et PME.
          <br />
          <br />
          Ce que je fais concrètement :
          <br />
          <br />
          ✅ Sites vitrine responsive et optimisés SEO
          <br />
          ✅ Boutiques e-commerce (Shopify, WooCommerce ou sur-mesure)
          <br />
          ✅ Applications web et MVP pour startups
          <br />
          ✅ Automatisations et outils métier sur-mesure
          <br />
          <br />
          J'ai développé et lancé mes propres produits SaaS (SpotMe, une app mobile pour trouver des partenaires de sport, et Guestly, un outil de gestion d'événements pour associations) — je sais donc penser un projet comme un vrai produit, pas juste comme une liste de specs à cocher.
          <br />
          <br />
          Réactif, à l'écoute, et transparent sur les délais. Premier échange gratuit pour cadrer votre besoin.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-8">Parcours</h2>
        <div className="space-y-5">
          {[
            {
              period: 'Juin 2024 – Décembre 2024',
              periodColor: 'text-indigo-400',
              title: 'Stagiaire Développeur — ONITI, Nantes',
              items: [
                "Création de sites internet pour les clients de l'entreprise",
                'Application de gestion du temps pour prises de paroles',
                'Présentation de projets, formation des collaborateurs',
              ],
            },
            {
              period: 'Avril 2026 - Aout 2026',
              periodColor: 'text-indigo-400',
              title: 'Stagiaire Développeur — Epitech, Nantes',
              items: [
                "Création d'une application web de gestion d'invités dans les évènements pour les associations",
                'Présentation de projets, formation des collaborateurs',
              ],
            },
            {
              period: '2022 – Présent',
              periodColor: 'text-cyan-400',
              title: 'Formé à Epitech Nantes',
              items: [
                "Programme Grande École (Expert en Technologies de l'Information) — en cours",
              ],
            },
            {
              period: 'Janvier 2026 - Présent',
              periodColor: 'text-cyan-400',
              title: 'Spotme',
              items: [
                "Application mobile communautaire pour sportifs, permettant de trouver des partenaires d'entraînement dans leurs salle de sport",
              ],
            }
          ].map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard hover={false}>
                <span className={`font-mono text-xs tracking-widest uppercase ${entry.periodColor}`}>
                  {entry.period}
                </span>
                <h3 className="text-slate-100 font-bold mt-1 mb-3">{entry.title}</h3>
                <ul className="text-slate-400 text-sm leading-relaxed space-y-1">
                  {entry.items.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-8">Compétences</h2>
        <div className="space-y-6">
          {Object.entries(SKILLS).map(([group, { items, color }]) => (
            <div key={group}>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-slate-500 mb-3 block">
                {group}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <NeonBadge key={s} label={s} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-slate-100 mb-6">Langues</h2>
        <div className="flex gap-8 flex-wrap">
          {LANGUAGES.map(({ lang, level }) => (
            <div key={lang} className="flex flex-col">
              <span className="text-slate-200 font-medium">{lang}</span>
              <span className="font-mono text-xs text-slate-500 tracking-wide uppercase mt-0.5">
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #818cf8, #06b6d4)' }}
      >
        Démarrons un projet <ArrowRight size={16} />
      </Link>
    </div>
  );
}

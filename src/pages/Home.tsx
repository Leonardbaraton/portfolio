import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParticleField } from '../components/ui/ParticleField';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <ParticleField />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(129,140,248,0.14) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-8">
              Développeur Freelance · Nantes
            </span>

            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]"
              style={GRADIENT_TEXT}
            >
              Léonard<br />Baraton
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
              Je construis et je livre.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #06b6d4)',
                }}
              >
                Voir les projets <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-slate-300 transition-all hover:scale-105 hover:text-slate-100 active:scale-95"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                Me contacter
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest uppercase text-slate-600">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, rgba(129,140,248,0.5), transparent)',
            }}
          />
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
            Projets
          </span>
          <h2
            className="text-3xl md:text-4xl font-black mt-2"
            style={GRADIENT_TEXT}
          >
            Ce que je construis
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/projets/${p.slug}`}
                className="block h-full rounded-2xl"
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-slate-100 font-bold text-lg">{p.title}</h3>
                    <ArrowRight
                      size={16}
                      className="text-indigo-400 mt-1 flex-shrink-0"
                    />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>
                  {p.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <NeonBadge key={tech} label={tech} color="indigo" />
                      ))}
                    </div>
                  )}
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm"
          >
            Tous les projets <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section
        className="px-6 py-16 max-w-6xl mx-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
              À propos
            </span>
            <h2 className="text-2xl font-bold text-slate-100 mt-2 mb-3">
              Formé à Epitech. Livraison garantie.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Développeur freelance basé à Nantes. Je construis des applications web pour des
              clients qui veulent du concret — de la première ligne de code au déploiement.
            </p>
          </div>
          <Link
            to="/a-propos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-300 transition-all hover:scale-105 self-start md:self-center"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            En savoir plus <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonBadge } from '../components/ui/NeonBadge';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

type Filter = 'tous' | Project['category'];

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Tous', value: 'tous' },
  { label: 'Web', value: 'web' },
  { label: 'Automatisation', value: 'automatisation' },
];

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export function Projects() {
  const [filter, setFilter] = useState<Filter>('tous');

  const visible =
    filter === 'tous' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="px-6 py-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400">
          Projets
        </span>
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight mt-2 mb-8"
          style={GRADIENT_TEXT}
        >
          Ce que je livre
        </h1>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono tracking-wide border transition-all ${
                filter === value
                  ? 'text-indigo-300 border-indigo-500/40 bg-indigo-500/12'
                  : 'text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/projets/${p.slug}`} className="block h-full rounded-2xl">
              <GlassCard className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs tracking-widest uppercase text-slate-500 block mb-1">
                      {p.category}
                    </span>
                    <h2 className="text-slate-100 font-bold text-lg">{p.title}</h2>
                  </div>
                  <ArrowRight size={16} className="text-indigo-400 mt-1 flex-shrink-0" />
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
    </div>
  );
}

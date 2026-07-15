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

function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <div className="px-6 py-32 max-w-4xl mx-auto text-slate-400">
        Projet introuvable.
      </div>
    );
  }

  return (
    <div className="px-6 py-32 max-w-4xl mx-auto">
      <Link
        to="/projets"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-12 font-mono text-sm tracking-wide rounded"
      >
        <ArrowLeft size={16} /> Projets
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
          {project.category}
        </span>

        <h1
          className="text-4xl md:text-6xl font-black tracking-tight mb-8"
          style={GRADIENT_TEXT}
        >
          {project.title}
        </h1>

        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map((tech) => (
              <NeonBadge key={tech} label={tech} color="indigo" />
            ))}
          </div>
        )}

        <p className="text-slate-300 text-lg leading-relaxed mb-16">
          {project.description}
        </p>

        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'rgba(129, 140, 248, 0.04)',
            border: '1px solid rgba(129, 140, 248, 0.12)',
          }}
        >
          <span className="font-mono text-sm text-slate-500 tracking-wide">
            Contenu détaillé en cours de rédaction
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectSpotme() { return <ProjectDetail slug="spotme" />; }
export function ProjectGuestly() { return <ProjectDetail slug="guestly" />; }
export function ProjectCockpit() { return <ProjectDetail slug="cockpit" />; }
export function ProjectArea() { return <ProjectDetail slug="area" />; }

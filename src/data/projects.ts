export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  category: 'web' | 'automatisation' | 'mobile';
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: 'spotme',
    title: 'SpotMe',
    description: 'Contenu à venir.',
    stack: [],
    category: 'mobile',
  },
  {
    slug: 'guestly',
    title: 'Guestly',
    description: 'Contenu à venir.',
    stack: [],
    category: 'web',
  },
  {
    slug: 'cockpit',
    title: 'Cockpit',
    description: 'Contenu à venir.',
    stack: [],
    category: 'mobile',
  },
  {
    slug: 'area',
    title: 'AREA — Automatisation Web',
    description:
      "Application web type IFTTT connectant divers services (Discord, GitHub, etc.). Développement d'une feature OAuth et intégration d'APIs tierces. Mise en place de « background workers » et d'un système d'alertes via Docker et PostgreSQL.",
    stack: ['FastAPI', 'React', 'Docker', 'PostgreSQL'],
    category: 'automatisation',
  },
];

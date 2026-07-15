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
    description: "SpotMe est une application mobile fitness communautaire (style réseau social local) qui connecte les sportifs dans leurs salles de sport. L'idée centrale : faciliter le co-entraînement entre sportifs du même salle de sport, comme un BlaBlaCar du sport.",
    stack: ['Firebase', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
    category: 'mobile',
  },
  {
    slug: 'guestly',
    title: 'Guestly',
    description: "Guestly est une application SaaS de gestion d'invités et d'événements, conçue pour les associations et les BDE (Bureaux Des Étudiants). Elle centralise les formulaires d'inscription, les invitations, les relances et le suivi des réponses, remplaçant les tableurs Excel par une plateforme intuitive et collaborative.",
    stack: ['Stripe', 'Mailjet', 'React', 'Vite', 'PostgreSQL', 'Docker'],
    category: 'web',
  },
  {
    slug: 'cockpit',
    title: 'Cockpit',
    description: "Cockpit est une application mobile de gestion de projets, de sport et de vie personnelle. Elle a pour objectif de devenir le cockpit de votre vie personnelle, sportive et professionnelle, en centralisant toutes vos tâches, objectifs et activités dans une seule interface intuitive. ",
    stack: ['SwiftUI'],
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

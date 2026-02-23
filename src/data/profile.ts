export const profile = {
  name: "Léonard Baraton",
  title: "Étudiant Développeur Full-Stack",
  school: "Epitech Nantes — Programme Grande École (Master), 3ème année",
  location: "Nantes, 44300",
  email: "leonardbaraton@gmail.com",
  github: "https://github.com/Leonardbaraton",
  linkedin: "https://www.linkedin.com/in/léonard-baraton-5a91362b5/",
  summary:
    "Étudiant en développement informatique en 3ème année à EPITECH Nantes. Motivé par l'apprentissage continu et l'acquisition de nouvelles compétences.",
};

export const skills = {
  languages: ["C / C++20", "JavaScript / TypeScript", "Python", "HTML / CSS"],
  frameworks: ["React", "FastAPI", "Node.js"],
  tools: [
    "Git / GitHub",
    "Docker",
    "PostgreSQL",
    "CI/CD (GitHub Actions)",
    "Linux (bash, environnement serveur)",
  ],
  other: [
    "Programmation réseau (sockets, client-serveur)",
    "Conception et implémentation d'API REST",
    "Pentest (Cybersécurité) — niveau Medium & Hard (TryHackMe)",
  ],
};

export const experiences = [
  {
    company: "ONITI",
    location: "Nantes",
    role: "Stagiaire Développeur (HTML / CSS / JavaScript)",
    period: "Juin 2024 – Décembre 2024",
    bullets: [
      "Création de sites internet pour les clients de l'entreprise.",
      "Création d'une application pour l'entreprise de gestion de temps pendant les prises de paroles.",
      "Participation aux réunions d'équipe, présentation de projets aux employés de l'entreprise.",
      "Rédaction de documentations et formation des collaborateurs sur les nouvelles fonctionnalités.",
    ],
  },
];

export const education = [
  {
    school: "Epitech Nantes",
    degree: "Expert en Technologies de l'Information",
    detail: "Programme Grande École (Master), en 3ème année",
    period: "2022 – présent",
  },
];

export const languages = [
  { lang: "Français", level: "Natif" },
  { lang: "Anglais", level: "Niveau C1" },
  { lang: "Allemand", level: "Niveau scolaire" },
];

export const projects = [
  {
    title: "AREA — Automatisation Web",
    description:
      "Application web type IFTTT connectant divers services (Discord, GitHub, etc.). Développement d'une feature OAuth et intégration d'APIs tierces. Mise en place de « background workers » et d'un système d'alertes via Docker et PostgreSQL.",
    stack: ["FastAPI", "React", "Docker", "PostgreSQL"],
    type: "Projet académique (Epitech)",
    link: "",
  },
  {
    title: "R-TYPE — Jeu multijoueur",
    description:
      "Ré-implémentation moderne d'un shoot'em-up à défilement horizontal multijoueur. Architecture client-serveur UDP avec ECS, rendu SFML et build system CMake/Conan.",
    stack: ["C++20", "SFML", "UDP", "CMake", "Conan"],
    type: "Projet académique (Epitech)",
    link: "",
  },
  {
    title: "CHISEL — Cybersécurité",
    description:
      "Pratique de la cybersécurité via la résolution de rooms TryHackMe (Medium et Hard) : reconnaissance, exploitation de failles, élévation de privilèges.",
    stack: ["Linux", "Bash", "Kali Linux"],
    type: "Projet académique (Epitech)",
    link: "",
  },
  {
    title: "EPITRELLO — Site internet",
    description:
      "Reproduction d'un site trello pour un projet académique avec un très grand nombre de fonctionnalités (authentification, gestion de projets, tâches, etc.).",
    stack: ["Node.js", "React", "Sqlite", "Docker"],
    type: "Projet académique (Epitech)",
    link: "",
  },
];

export const hobbies = [
  "Musculation",
  "Kick-Boxing",
  "Flute à bec",
  "MMA",
  "Jiu-Jitsu Brésilien",
  "Sorties en famille et entre amis",
];

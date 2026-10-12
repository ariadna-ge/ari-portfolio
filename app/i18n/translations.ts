export const LANGUAGES = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Lang = "es";

const es = {
  menu: {
    open: "Abrir menú",
    language: "Idioma",
    home: "Inicio",
    about: "Sobre mí",
    skills: "Habilidades",
    contact: "Contacto",
  },
  hero: {
    portfolio: "Portfolio",
    imageAlt: "Chica con una laptop",
    role: "Desarrollo de Software",
    roleWords: ["DESARROLLO", "DE SOFTWARE"] as [string, string],
  },
  about: {
    title: "Sobre mí",
    greeting: "¡Hola, soy Ariadna!",
    tagline: "Construyo, analizo y sigo aprendiendo.",
    paragraph:
      "Soy desarrolladora de software y construyo aplicaciones web tanto en frontend como en backend. Desde interfaces hasta APIs y bases de datos, disfruto entender cómo encajan todas las piezas. También estoy explorando el mundo de los datos, desarrollando mis habilidades de análisis y visualización para convertir la información en conocimiento útil.",
    motto: "Código + Datos + Curiosidad es lo que me mantiene creando.",
    avatarAlt: "Ilustración de Ariadna pensando",
    education: "EDUCACIÓN",
    degrees: [
      {
        degree: "Ingeniería en Computación",
        detail: "UNAM · egresada 2026",
      },
      {
        degree: "Técnico en Desarrollo de Aplicaciones Web y Bases de Datos",
        detail: "UNAM · egresada 2021",
      },
    ],
  },
  skills: {
    title: "Habilidades",
    sections: {
      frontend: "Frontend",
      backend: "Backend",
      ux: "UX/UI",
      data: "Datos",
      cloud: "Nube y Herramientas",
    },
  },
  projects: {
    title: "Proyectos",
  },
  contact: {
    title: "Contáctame",
    cta: ["¡No seas tímido!", "Me encanta conocer gente nueva."] as [string, string],
    cv: "Mi CV",
    cvTitle: "Abrir mi CV en PDF",
  },
  footer: {
    motto: "Convirtamos las ideas en algo que valga la pena recordar",
    credits: "© 2026 — Diseñado y creado con cariño | ADGE",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  menu: {
    open: "Open menu",
    language: "Language",
    home: "Home",
    about: "About me",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    portfolio: "Portfolio",
    imageAlt: "Girl with a laptop",
    role: "Software Developer",
    roleWords: ["SOFTWARE", "DEVELOPER"],
  },
  about: {
    title: "About me",
    greeting: "Hi I'm Ariadna!",
    tagline: "I build, analyze & keep learning.",
    paragraph:
      "I'm a Software Developer building web applications across the frontend and backend. From interfaces to APIs and databases, I enjoy understanding how the different pieces come together. I'm also exploring the world of data, developing my skills in analysis and visualization to turn information into meaningful insights.",
    motto: "Code + Data + Curiosity are the things that keep me building.",
    avatarAlt: "Illustration of Ariadna thinking",
    education: "EDUCATION",
    degrees: [
      {
        degree: "B.S. in Computer Engineering",
        detail: "UNAM · graduated 2026",
      },
      {
        degree: "Technical Degree in Web Application Development & Databases",
        detail: "UNAM · graduated 2021",
      },
    ],
  },
  skills: {
    title: "Skills",
    sections: {
      frontend: "Frontend",
      backend: "Backend",
      ux: "UX/UI",
      data: "Data",
      cloud: "Cloud and Tools",
    },
  },
  projects: {
    title: "Projects",
  },
  contact: {
    title: "Contact me",
    cta: ["Don’t be shy!", "I love meeting new people."],
    cv: "My Resume",
    cvTitle: "Open my Resume (PDF)",
  },
  footer: {
    motto: "Let’s turn ideas into something worth remembering",
    credits: "© 2026 — Designed & crafted with love | ADGE",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { es, en };

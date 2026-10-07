"use client";

import type { IconType } from "react-icons";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaWordpress,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiKotlin,
  SiMysql,
  SiCloudflare,
  SiDigitalocean,
  SiPostman,
  SiResend,
} from "react-icons/si";

import { TbBrandCSharp } from "react-icons/tb";

// react-icons no incluye Canva: círculo con una "C" para mantener el estilo
const CanvaIcon: IconType = ({ size = 28, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M15.5 9.5a4.5 4.5 0 1 0 0 5" />
  </svg>
);

type Tech ={ name: string; Icon: IconType };
type Section = {
  title: string;
  techs: Tech[];
  lowered?: boolean;
};

const sections: Section[] = [
  {
    title: "Frontend",
    techs: [
      { name: "HTML", Icon: FaHtml5 },
      { name: "CSS", Icon: FaCss3Alt },
      { name: "JavaScript", Icon: FaJs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "React", Icon: FaReact },
      { name: "Angular", Icon: FaAngular },
      { name: "Next.js", Icon: SiNextdotjs },
    ],
  },
  {
    title: "Backend",
    lowered: true,
    techs: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express.js", Icon: SiExpress },
      { name: "Python", Icon: FaPython },
      { name: "Java", Icon: FaJava },
      { name: "C#", Icon: TbBrandCSharp },
      { name: "Kotlin", Icon: SiKotlin },
    ],
  },
  {
    title: "UX/UI",
    techs: [
      { name: "Figma", Icon: FaFigma },
      { name: "Canva", Icon: CanvaIcon },
      { name: "WordPress", Icon: FaWordpress }
    ],
  },
  {
    title: "DATA",
    lowered: true,
    techs: [
      { name: "MySQL", Icon: SiMysql },
      { name: "SQL", Icon: FaDatabase },
      { name: "Python", Icon: FaPython },
    ],
  },
  {
    title: "Cloud and Tools",
    techs: [
      { name: "Git", Icon: FaGitAlt },
      { name: "GitHub", Icon: FaGithub },
      { name: "Docker", Icon: FaDocker },
      { name: "Cloudflare", Icon: SiCloudflare },
      { name: "DigitalOcean", Icon: SiDigitalocean },
      { name: "Postman", Icon: SiPostman },
      { name: "Resend", Icon: SiResend },
    ],
  },
];

function Arrow() {
  return (
    <svg
      width="32"
      height="44"
      viewBox="0 0 48 64"
      fill="none"
      stroke="#ED57A3"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 4 C23 20, 25 36, 24 58" />
      <path d="M6 42 L24 60 L42 42" />
    </svg>
  );
}

const COLORS = {
  bg: "var(--color-1)",
  text: "var(--color-3)",
  heading: "var(--color-5)",
  folder: "var(--color-3)",
  folderText: "var(--color-1)",
  white: "var(--white)",
};

const TITLE_LETTERS: ({ char: string; variant: string } | null)[] = [
  { char: "s", variant: "plain" },
  { char: "k", variant: "dots" },
  { char: "i", variant: "paper" },
  { char: "l", variant: "shadow" },
  { char: "l", variant: "stripes" },
  { char: "s", variant: "plainTwo" },
];


function NewspaperTitle() {
  return (
    <h2 className="newspaper" aria-label="Skills">
      {TITLE_LETTERS.map((letter, i) =>
        letter ? (
          <span
            key={i}
            aria-hidden="true"
            className={`letter ${letter.variant}`}
          >
            {letter.char}
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            &nbsp;
          </span>
        )
      )}
    </h2>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-white px-4 py-16">
      {/* Newspaper-style title */}
      <div className="mb-12 flex justify-center">
        <NewspaperTitle />
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-x-6 gap-y-12 lg:flex-nowrap lg:gap-x-4">
        {sections.map(({ title, techs, lowered }) => (
          <div
            key={title}
            className={`flex w-48 flex-col items-center ${
              lowered ? "lg:mt-10" : ""
            }`}
          >
            {/* Círculo */}
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#ED57A3] px-3 text-center text-base font-bold leading-tight text-white">
              {title}
            </div>

            {/* Flecha */}
            <div className="mt-2">
              <Arrow />
            </div>

            {/* Iconos */}
            <ul className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-3">
              {techs.map(({ name, Icon }) => (
                <li
                  key={`${title}-${name}`}
                  className="flex w-14 flex-col items-center gap-1 text-center"
                >
                  <Icon
                    size={28}
                    className="text-[#8B3A62]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-medium text-neutral-700">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n/LanguageProvider";
import NewspaperTitle from "../../i18n/NewspaperTitle";
import Reveal from "../ui/Reveal";
import Typewriter from "../ui/Typewriter";

const headingFont = { className: "font-[family-name:var(--font-boldonse)]" };
const bodyFont = { className: "font-[family-name:var(--font-fahkwang)]" };
const serifFont = {
  className: "font-[family-name:var(--font-instrument-serif)]",
};

const AVATAR_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/avatar-thinking.png`;

const COLORS = {
  bg: "var(--color-1)",
  text: "var(--color-3)",
  heading: "var(--color-5)",
  folder: "var(--color-3)",
  folderText: "var(--color-1)",
  white: "var(--white)",
};

/* Folder shape: top-left tab with a diagonal corner */
function FolderShape() {
  return (
    <svg
      viewBox="0 0 359 287"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M0,30 Q0,0 30,0 L145,0 L180,36 L329,36 Q359,36 359,66 L359,257 Q359,287 329,287 L30,287 Q0,287 0,257 Z"
        fill={COLORS.folder}
      />
    </svg>
  );
}

function EducationCard({
  degree,
  detail,
  delay,
}: {
  degree: string;
  detail: string;
  delay: number;
}) {
  return (
    <Reveal
      as="li"
      variant="pop"
      delay={delay}
      className="relative w-full"
      style={{ aspectRatio: "359 / 287" }}
    >
      <FolderShape />
      <div
        className="relative flex h-full flex-col items-center justify-center text-center"
        style={{ padding: "16% 8% 6%" }}
      >
        <h3
          className={`${bodyFont.className} m-0 text-[0.75rem] sm:text-[0.9rem] lg:text-[1.8cqw]`}
          style={{
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            color: COLORS.folderText,
          }}
        >
          {degree}
        </h3>
        <p
          className={`${serifFont.className} m-0 mt-1 text-[0.7rem] sm:mt-2 sm:text-[0.85rem] lg:mt-[0.9cqw] lg:text-[1.5cqw]`}
          style={{
            letterSpacing: "0.06em",
            color: COLORS.white,
          }}
        >
          {detail}
        </p>
      </div>
    </Reveal>
  );
}

export default function AboutMe() {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div
        className="relative flex w-full flex-col gap-8 px-5 py-10 sm:px-8 lg:mx-auto lg:block lg:aspect-[16/9] lg:w-[80%] lg:max-w-[1100px] lg:p-0"
        style={{ containerType: "inline-size" }}
      >
      {/* Newspaper-style title */}
      <div className="z-10 self-center lg:absolute lg:left-[3.9%] lg:top-[6%] lg:self-auto">
        <Reveal variant="pop">
          <NewspaperTitle text={t.about.title} />
        </Reveal>
      </div>

      {/* Intro text */}
      <div
        className="mx-auto w-full max-w-2xl lg:absolute lg:left-[3.9%] lg:top-[27.5%] lg:mx-0 lg:w-[39cqw] lg:max-w-none"
        style={{ color: COLORS.text }}
      >
        <h2
          className={`${serifFont.className} m-0 text-xl sm:text-2xl lg:text-[2.4cqw]`}
          style={{ lineHeight: 1.45, fontWeight: 400 }}
        >
          <Typewriter text={t.about.greeting} speed={45} delay={300} />
          <br />
          <Typewriter
            text={t.about.tagline}
            speed={40}
            delay={300 + t.about.greeting.length * 45 + 200}
          />
        </h2>

        <Reveal
          as="p"
          variant="left"
          delay={200}
          className={`${bodyFont.className} m-0 mt-4 text-sm sm:text-base lg:mt-[2.6cqw] lg:text-[1.45cqw]`}
          style={{ lineHeight: 1.58 }}
        >
          {t.about.paragraph}
        </Reveal>

        <Reveal
          as="p"
          variant="left"
          delay={450}
          className={`${bodyFont.className} m-0 mt-4 text-sm font-bold sm:text-base lg:mt-[2.6cqw] lg:text-[1.45cqw]`}
          style={{ lineHeight: 1.58 }}
        >
          {t.about.motto}
        </Reveal>
      </div>

      <Reveal
        variant="up"
        threshold={0.1}
        className="relative mx-auto h-72 w-full max-w-sm sm:h-96 lg:absolute lg:bottom-0 lg:left-[38%] lg:mx-0 lg:h-[90%] lg:w-[35cqw] lg:max-w-none"
      >
        <Image
          src={AVATAR_SRC}
          alt={t.about.avatarAlt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 24rem, 90vw"
          className="object-contain object-bottom"
        />
      </Reveal>

      {/* Education */}
      <div className="flex flex-col items-center lg:absolute lg:left-[72%] lg:top-[10%] lg:w-[25cqw]">
        <Reveal variant="right">
          <h2
            className={`${headingFont.className} m-0 text-2xl sm:text-3xl lg:text-[3cqw]`}
            style={{
              lineHeight: 1,
              letterSpacing: "0.08em",
              color: COLORS.heading,
            }}
          >
            {t.about.education}
          </h2>
        </Reveal>

        <ul
          className="m-0 mt-6 flex w-full max-w-[16rem] list-none flex-col gap-4 p-0 lg:mt-[4cqw] lg:max-w-none lg:gap-[2cqw]"
        >
          {t.about.degrees.map((item, i) => (
            <EducationCard key={item.degree} {...item} delay={250 + i * 250} />
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
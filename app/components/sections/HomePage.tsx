"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLanguage } from "../../i18n/LanguageProvider";
import Reveal from "../ui/Reveal";
import Typewriter from "../ui/Typewriter";

const titleFont = { className: "font-[family-name:var(--font-boldonse)]" };
const nameFont = { className: "font-[family-name:var(--font-fahkwang)]" };
const labelFont = {
  className: "font-[family-name:var(--font-instrument-serif)]",
};

const AVATAR_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/avatar.png`;

const COLORS = {
  bg: "var(--hero-bg)",
  dots: "var(--color-3)",
  pink: "var(--color-1)",
  white: "var(--white)",
};
type Letter = { char: string; left: number; top: number; size: number };

const TITLE_LETTERS: Letter[] = [
  // PoRt
  { char: "P", left: 6.5, top: 7, size: 18 },
  { char: "o", left: 15, top: 17, size: 15 },
  { char: "r", left: 29, top: 9, size: 18 },
  { char: "t", left: 39, top: 10, size: 18 },
  // folio
  { char: "f", left: 5, top: 50, size: 15 },
  { char: "o", left: 11, top: 50, size: 14 },
  { char: "l", left: 23.8, top: 55, size: 15 },
  { char: "i", left: 28, top: 50, size: 13 },
  { char: "o", left: 32, top: 49, size: 17 },
];

const halftoneStyle: CSSProperties = {
  backgroundImage: `
    radial-gradient(circle, ${COLORS.dots} 42%, transparent 44%),
    radial-gradient(circle, ${COLORS.dots} 42%, transparent 44%)
  `,
  backgroundSize: "max(2.4cqw, 12px) max(2.4cqw, 12px)",
  backgroundPosition: "0 0, max(1.2cqw, 6px) max(1.2cqw, 6px)",
  WebkitMaskImage:
    "radial-gradient(ellipse 75% 85% at 45% 20%, #000 35%, transparent 90%)",
  maskImage:
    "radial-gradient(ellipse 75% 85% at 45% 20%, #000 35%, transparent 90%)",
};

function VerticalWord({ word }: { word: string }) {
  return (
    <span className="flex flex-col items-center" aria-hidden="true">
      {word.split("").map((letter, i) => (
        <span key={i} style={{ lineHeight: 1.05 }}>
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </span>
  );
}

export default function PortfolioHero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: COLORS.bg,
        containerType: "inline-size",
      }}
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={halftoneStyle}
      />

      <div
        className="relative lg:mx-auto lg:aspect-[16/9] lg:w-[80%] lg:max-w-[1100px]"
        style={{ containerType: "inline-size" }}
      >

      {/* Mobile / tablet: flow layout */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-10 text-center sm:py-14 lg:hidden">
        <h1
          className={`${titleFont.className} m-0 text-[clamp(3rem,17vw,6rem)] leading-[1.05]`}
          style={{ color: COLORS.pink }}
        >
          <span className="sr-only">{t.hero.portfolio}</span>
          <span aria-hidden="true" className="block">
            {"PoRt".split("").map((c, i) => (
              <Reveal
                key={i}
                as="span"
                variant="drop"
                delay={i * 90}
                threshold={0}
                className="inline-block"
              >
                {c}
              </Reveal>
            ))}
          </span>
          <span aria-hidden="true" className="block">
            {"folio".split("").map((c, i) => (
              <Reveal
                key={i}
                as="span"
                variant="drop"
                delay={400 + i * 90}
                threshold={0}
                className="inline-block"
              >
                {c}
              </Reveal>
            ))}
          </span>
        </h1>

        <Reveal
          variant="pop"
          delay={500}
          className="relative aspect-square w-4/5 max-w-sm sm:max-w-md"
        >
          <Image
            src={AVATAR_SRC}
            alt={t.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 640px) 28rem, 80vw"
            className="object-contain object-top"
          />
        </Reveal>

        <p
          className={`${labelFont.className} m-0 text-xl tracking-wide sm:text-3xl`}
          style={{ color: COLORS.pink }}
        >
          <Typewriter
            text={`${t.hero.roleWords[0]} ${t.hero.roleWords[1]}`}
            delay={900}
            speed={60}
          />
        </p>

        <div
          className="w-full max-w-md px-4 py-3"
          style={{ border: `2px solid ${COLORS.pink}` }}
        >
          <h2
            className={`${nameFont.className} m-0 text-xs uppercase tracking-[0.12em] sm:text-base`}
            style={{ color: COLORS.white }}
          >
            <Typewriter
              text="Ariadna Denisse García Estrada"
              delay={1800}
              speed={55}
            />
          </h2>
        </div>
      </div>

      {/* Desktop: absolute composition scaled with the container */}
      <div className="hidden lg:block">
      {/* Image */}
      <Reveal
        variant="zoom"
        delay={500}
        threshold={0}
        className="absolute"
        style={{ left: "42.7%", top: "13%", width: "44cqw", height: "44cqw" }}
      >
        <Image
          src={AVATAR_SRC}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="44vw"
          className="object-contain object-top"
        />
      </Reveal>
      <h1 className={`${titleFont.className} absolute inset-0 z-10 m-0`}>
        <span className="sr-only">{t.hero.portfolio}</span>
        {TITLE_LETTERS.map((l, i) => (
          <Reveal
            key={i}
            as="span"
            aria-hidden={true}
            variant="drop"
            delay={i * 110}
            threshold={0}
            className="absolute select-none"
            style={{
              left: `${l.left}%`,
              top: `${l.top}%`,
              fontSize: `${l.size}cqw`,
              lineHeight: 1,
              color: COLORS.pink,
            }}
          >
            {l.char}
          </Reveal>
        ))}
      </h1>
      <p
        className={`${labelFont.className} absolute z-10 m-0 flex gap-[1.8cqw]`}
        style={{
          right: "3.5%",
          top: "10%",
          fontSize: "2.3cqw",
          color: COLORS.pink,
        }}
      >
        <span className="sr-only">{t.hero.role}</span>
        <Reveal as="span" variant="down" delay={900} threshold={0}>
          <VerticalWord word={t.hero.roleWords[0]} />
        </Reveal>
        <span style={{ marginTop: "13.5cqw" }}>
          <Reveal as="span" variant="up" delay={1100} threshold={0} className="block">
            <VerticalWord word={t.hero.roleWords[1]} />
          </Reveal>
        </span>
      </p>
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          left: "3.2%",
          top: "88%",
          width: "46.6%",
          height: "9%",
          border: `0.16cqw solid ${COLORS.pink}`,
        }}
      >
        <h2
          className={`${nameFont.className} m-0 whitespace-nowrap uppercase`}
          style={{
            fontSize: "1.8cqw",
            letterSpacing: "0.12em",
            color: COLORS.white,
          }}
        >
          <Typewriter
            text="Ariadna Denisse García Estrada"
            delay={1600}
            speed={55}
          />
        </h2>
      </div>
      </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";

const titleFont = { className: "font-[family-name:var(--font-boldonse)]" };
const nameFont = { className: "font-[family-name:var(--font-fahkwang)]" };
const labelFont = {
  className: "font-[family-name:var(--font-instrument-serif)]",
};

const AVATAR_SRC = "/images/avatar.png";

const COLORS = {
  bg: "var(--color-6)",
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
  backgroundSize: "2.4cqw 2.4cqw",
  backgroundPosition: "0 0, 1.2cqw 1.2cqw",
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
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function PortfolioHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "16 / 9",
        backgroundColor: COLORS.bg,
        containerType: "inline-size",
      }}
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={halftoneStyle}
      />
      {/* Image */}
      <div
        className="absolute"
        style={{ left: "42.7%", top: "13%", width: "44cqw", height: "44cqw" }}
      >
        <Image
          src={AVATAR_SRC}
          alt="Girl with a laptop"
          fill
          priority
          sizes="44vw"
          className="object-contain object-top"
        />
      </div>
      <h1 className={`${titleFont.className} absolute inset-0 z-10 m-0`}>
        <span className="sr-only">Portfolio</span>
        {TITLE_LETTERS.map((l, i) => (
          <span
            key={i}
            aria-hidden="true"
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
          </span>
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
        <span className="sr-only">Software Developer</span>
        <VerticalWord word="SOFTWARE" />
        <span style={{ marginTop: "13.5cqw" }}>
          <VerticalWord word="DEVELOPER" />
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
          Ariadna Denisse Garcia Estrada
        </h2>
      </div>
    </section>
  );
}

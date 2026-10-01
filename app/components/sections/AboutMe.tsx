import Image from "next/image";

const headingFont = { className: "font-[family-name:var(--font-boldonse)]" };
const bodyFont = { className: "font-[family-name:var(--font-fahkwang)]" };
const serifFont = {
  className: "font-[family-name:var(--font-instrument-serif)]",
};

const AVATAR_SRC = "/images/avatar-thinking.png"; 

const COLORS = {
  bg: "var(--color-1)",
  text: "var(--color-3)",
  heading: "var(--color-5)",
  folder: "var(--color-3)",
  folderText: "var(--color-1)",
  white: "var(--white)",
};

const EDUCATION = [
  {
    degree: "B.S. in Computer Engineering",
    detail: "UNAM · graduated 2026",
  },
  {
    degree: "Technical Degree in Web Application Development & Databases",
    detail: "UNAM · graduated 2021",
  },
];

const TITLE_LETTERS: ({ char: string; variant: string } | null)[] = [
  { char: "A", variant: "plain" },
  { char: "b", variant: "dots" },
  { char: "o", variant: "paper" },
  { char: "u", variant: "shadow" },
  { char: "t", variant: "stripes" },
  null,
  { char: "m", variant: "plainTwo" },
  { char: "e", variant: "solid" },
];

function NewspaperTitle() {
  return (
    <h2 className="newspaper" aria-label="About me">
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

function EducationCard({ degree, detail }: { degree: string; detail: string }) {
  return (
    <li className="relative w-full" style={{ aspectRatio: "359 / 287" }}>
      <FolderShape />
      <div
        className="relative flex h-full flex-col items-center justify-center text-center"
        style={{ padding: "16% 8% 6%" }}
      >
        <h3
          className={`${bodyFont.className} m-0`}
          style={{
            fontSize: "1.8cqw",
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            color: COLORS.folderText,
          }}
        >
          {degree}
        </h3>
        <p
          className={`${serifFont.className} m-0`}
          style={{
            fontSize: "1.5cqw",
            letterSpacing: "0.06em",
            marginTop: "0.9cqw",
            color: COLORS.white,
          }}
        >
          {detail}
        </p>
      </div>
    </li>
  );
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "16 / 9",
        backgroundColor: COLORS.bg,
        containerType: "inline-size",
      }}
    >
      {/* Newspaper-style title */}
      <div className="absolute z-10" style={{ left: "3.9%", top: "6%" }}>
        <NewspaperTitle />
      </div>

      {/* Intro text */}
      <div
        className="absolute"
        style={{ left: "3.9%", top: "27.5%", width: "39cqw", color: COLORS.text }}
      >
        <h2
          className={`${serifFont.className} m-0`}
          style={{ fontSize: "2.4cqw", lineHeight: 1.45, fontWeight: 400 }}
        >
          Hi I&apos;m Ariadna!
          <br />
          I build, analyze &amp; keep learning.
        </h2>

        <p
          className={`${bodyFont.className} m-0`}
          style={{ fontSize: "1.45cqw", lineHeight: 1.58, marginTop: "2.6cqw" }}
        >
          I&apos;m a Software Developer building web applications across the
          frontend and backend. From interfaces to APIs and databases, I enjoy
          understanding how the different pieces come together. I&apos;m also
          exploring the world of data, developing my skills in analysis and
          visualization to turn information into meaningful insights.
        </p>

        <p
          className={`${bodyFont.className} m-0 font-bold`}
          style={{ fontSize: "1.45cqw", lineHeight: 1.58, marginTop: "2.6cqw" }}
        >
          Code + Data + Curiosity are the things that keep me building.
        </p>
      </div>

      <div
        className="absolute bottom-0"
        style={{ left: "38%", width: "35cqw", height: "90%" }}
      >
        <Image
          src={AVATAR_SRC}
          alt="Illustration of Ariadna thinking"
          fill
          sizes="32vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Education */}
      <div
        className="absolute flex flex-col items-center"
        style={{ left: "72%", top: "10%", width: "25cqw" }}
      >
        <h2
          className={`${headingFont.className} m-0`}
          style={{
            fontSize: "3cqw",
            lineHeight: 1,
            letterSpacing: "0.08em",
            color: COLORS.heading,
          }}
        >
          EDUCATION
        </h2>

        <ul
          className="m-0 flex w-full list-none flex-col p-0"
          style={{ gap: "2cqw", marginTop: "4cqw" }}
        >
          {EDUCATION.map((item) => (
            <EducationCard key={item.degree} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
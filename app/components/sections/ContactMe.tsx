import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ariadna-ge", Icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ariadna-ge",
    Icon: FaLinkedinIn,
  },
  { label: "Email", href: "mailto:ariadna.denisse.g@gmail.com@gmail.com", Icon: FaEnvelope },
];

const headingFont = { className: "font-[family-name:var(--font-boldonse)]" };
const bodyFont = { className: "font-[family-name:var(--font-fahkwang)]" };
const serifFont = {
  className: "font-[family-name:var(--font-instrument-serif)]",
};

const COLORS = {
  bg: "var(--color-1)",
  text: "var(--color-3)",
  heading: "var(--color-5)",
  folder: "var(--color-3)",
  folderText: "var(--color-1)",
  white: "var(--white)",
};

const TITLE_LETTERS: ({ char: string; variant: string } | null)[] = [
  { char: "c", variant: "plain" },
  { char: "o", variant: "dots" },
  { char: "n", variant: "paper" },
  { char: "t", variant: "shadow" },
  { char: "a", variant: "stripes" },
  { char: "c", variant: "plainTwo" },
  { char: "t", variant: "solid" },
  null,
  { char: "m", variant: "plain" },
  { char: "e", variant: "dots" },
];

function NewspaperTitle() {
  return (
    <h2 className="newspaper" aria-label="Contact me">
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

export default function ContactMe() {
  return (
    <section
      id="contact"
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

      {/* Call to action + social links */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "3.9%", top: "38%", width: "60cqw", gap: "3.5cqw" }}
      >
        <p
          className={`${headingFont.className} m-0 uppercase`}
          style={{
            fontSize: "4.2cqw",
            lineHeight: 1.25,
            color: COLORS.heading,
          }}
        >
          Don’t be shy!
          <br />I love meeting new people.
        </p>

        <ul
          className={`${bodyFont.className} m-0 flex list-none p-0`}
          style={{ gap: "3cqw", fontSize: "1.6cqw", color: COLORS.text }}
        >
          {SOCIALS.map(({ label, href, Icon }, i) => (
            <li key={label} className="flex items-center" style={{ gap: "3cqw" }}>
              {i > 0 && <span aria-hidden="true">·</span>}
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center transition-opacity hover:opacity-70"
                style={{ gap: "0.8cqw" }}
              >
                <Icon style={{ width: "2.2cqw", height: "2.2cqw" }} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
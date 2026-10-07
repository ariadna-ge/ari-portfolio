"use client";

import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageProvider";
import NewspaperTitle from "../../i18n/NewspaperTitle";

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

export default function ContactMe() {
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div
        className="relative flex w-full flex-col gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:mx-auto lg:block lg:aspect-[16/9] lg:w-[80%] lg:max-w-[1100px] lg:p-0"
        style={{ containerType: "inline-size" }}
      >
      {/* Newspaper-style title */}
      <div className="z-10 self-center lg:absolute lg:left-[3.9%] lg:top-[6%] lg:self-auto">
        <NewspaperTitle text={t.contact.title} />
      </div>

      {/* Call to action + social links */}
      <div className="z-10 mx-auto flex w-full max-w-2xl flex-col gap-6 text-center lg:absolute lg:left-[3.9%] lg:top-[38%] lg:mx-0 lg:w-[60cqw] lg:max-w-none lg:gap-[3.5cqw] lg:text-left">
        <p
          className={`${headingFont.className} m-0 text-lg uppercase sm:text-3xl lg:text-[4.2cqw]`}
          style={{
            lineHeight: 1.25,
            color: COLORS.heading,
          }}
        >
          {t.contact.cta[0]}
          <br />
          {t.contact.cta[1]}
        </p>

        <ul
          className={`${bodyFont.className} m-0 flex list-none flex-wrap justify-center gap-x-3 gap-y-3 p-0 text-sm sm:gap-x-5 sm:text-base lg:justify-start lg:gap-[3cqw] lg:text-[1.6cqw]`}
          style={{ color: COLORS.text }}
        >
          {SOCIALS.map(({ label, href, Icon }, i) => (
            <li key={label} className="flex items-center gap-3 sm:gap-5 lg:gap-[3cqw]">
              {i > 0 && <span aria-hidden="true">·</span>}
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-opacity hover:opacity-70 lg:gap-[0.8cqw]"
              >
                <Icon className="h-5 w-5 lg:h-[2.2cqw] lg:w-[2.2cqw]" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
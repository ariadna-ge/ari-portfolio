"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Menu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-[var(--color-6)]/75 backdrop-blur-md"
          : "bg-[var(--color-6)]"
      } py-3 md:px-8 md:py-4 lg:px-12`}>
      <div className="flex items-center justify-between">
        <Link
          href="https://github.com/ariadna-ge"
          className="flex items-center gap-2 text-[#ffbdd8]"
          aria-label="Github"
        >
          <FaGithub className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />

          <span className="font-[family-name:var(--font-fahkwang)] text-lg font-bold md:text-xl">
            ariadna-ge
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Menu />
        </div>
      </div>
    </header>
  );
}
"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageProvider";

const SHOW_AFTER = 400;

export default function ScrollToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label={t.menu.backToTop}
      title={t.menu.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-[900] flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-1)] text-[var(--color-6)] shadow-lg transition-all duration-300 hover:scale-110 md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaChevronUp aria-hidden="true" />
    </button>
  );
}

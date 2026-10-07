"use client";

import { Laptop } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full bg-[#5c1a3a] px-6 py-10 text-center text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <Laptop className="h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
        {/* Lema */}
        <p className="mt-6 font-[family-name:var(--font-fahkwang)] text-[0.4rem] tracking-[0.10em] md:text-lg">
          {t.footer.motto}
        </p>

        {/* Copyright */}
        <p className="mt-6 font-[family-name:var(--font-instrument-serif)] text-[0.5rem] tracking-[0.03em] md:text-base">
          {t.footer.credits}
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageProvider";
import { LANGUAGES, type Lang } from "../../i18n/translations";
import { useDismiss } from "./useDismiss";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t.menu.language}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="text-[var(--color-1)]"
      >
        <FaGlobe className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t.menu.language}
          className="absolute right-0 top-full z-50 mt-3 min-w-36 rounded-md bg-[var(--color-1)] p-1 shadow-lg"
        >
          {(Object.keys(LANGUAGES) as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={code === lang}
              onClick={() => {
                setLang(code);
                close();
              }}
              className={`block w-full rounded px-3 py-2 text-left font-[family-name:var(--font-fahkwang)] text-sm text-[var(--color-6)] hover:bg-[var(--color-2)] hover:text-white ${
                code === lang ? "font-bold" : ""
              }`}
            >
              {LANGUAGES[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

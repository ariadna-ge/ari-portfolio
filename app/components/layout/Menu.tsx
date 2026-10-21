"use client";

import { useCallback, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageProvider";
import { useDismiss } from "./useDismiss";

const LINKS = ["home", "about", "skills", "projects", "contact"] as const;

export default function Menu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t.menu.open}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center text-[var(--color-1)]"
      >
        <FaBars className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {open && (
        <nav
          aria-label={t.menu.open}
          className="absolute right-0 top-full z-50 mt-3 min-w-40 rounded-md bg-[var(--color-1)] p-1 shadow-lg"
        >
          {LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={close}
              className="block rounded px-3 py-2 font-[family-name:var(--font-fahkwang)] text-sm text-[var(--color-6)] hover:bg-[var(--color-2)] hover:text-white"
            >
              {t.menu[id]}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

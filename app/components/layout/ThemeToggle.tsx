"use client";

import { useSyncExternalStore } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageProvider";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage no disponible: el tema solo dura la sesión
  }
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const { t } = useLanguage();
  const theme = useSyncExternalStore<Theme>(subscribe, getSnapshot, () => "light");
  const isDark = theme === "dark";
  const label = isDark ? t.menu.themeLight : t.menu.themeDark;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center text-[var(--color-1)]"
    >
      {isDark ? (
        <FaSun className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
      ) : (
        <FaMoon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
      )}
    </button>
  );
}

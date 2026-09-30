import { Laptop } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#5c1a3a] px-6 py-10 text-center text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <Laptop className="h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
        {/* Lema */}
        <p className="mt-6 font-[family-name:var(--font-fahkwang)] text-[0.4rem] tracking-[0.10em] md:text-lg">
          Let’s turn ideas into something worth remembering
        </p>

        {/* Copyright */}
        <p className="mt-6 font-[family-name:var(--font-instrument-serif)] text-[0.5rem] tracking-[0.03em] md:text-base">
          © 2026 — Designed &amp; crafted with love | ADGE
        </p>
      </div>
    </footer>
  );
}

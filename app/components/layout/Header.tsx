import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Menu from "./Menu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header className="relative w-full bg-[var(--color-6)] px-4 py-3 md:px-8 md:py-4 lg:px-12">
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
import { FaBars } from "react-icons/fa";

export default function Menu() {
  return (
    <button
      type="button"
      aria-label="Open menu"
      className="text-[var(--color-1)]"
    >
      <FaBars className="h-5 w-5 md:h-6 md:w-6" />
    </button>
  );
}
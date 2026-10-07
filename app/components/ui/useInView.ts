"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true while the referenced element is inside the viewport.
 * It flips back to false when the element leaves, so animations can replay.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.2
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

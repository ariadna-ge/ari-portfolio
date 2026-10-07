"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  delay?: number;
  className?: string;
};

/**
 * Types the text out when it scrolls into view (and again each time it
 * re-enters). The untyped remainder stays in the layout, invisible, so the
 * block never changes size while typing.
 */
export default function Typewriter({
  text,
  speed = 35,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, 0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [inView, text, speed, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {inView && <span className="tw-caret" />}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </span>
  );
}

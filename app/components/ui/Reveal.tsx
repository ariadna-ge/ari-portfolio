"use client";

import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useInView } from "./useInView";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoom"
  | "pop"
  | "drop";

type Props = {
  children?: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Delay in ms before the animation starts */
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
};

/**
 * Animates its content in when it enters the viewport and out when it leaves.
 * The visual definitions live in globals.css (.reveal).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  threshold = 0.2,
  className = "",
  style,
  "aria-hidden": ariaHidden,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, threshold);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      data-visible={visible}
      aria-hidden={ariaHidden}
      className={`reveal ${className}`}
      style={{ ...style, ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

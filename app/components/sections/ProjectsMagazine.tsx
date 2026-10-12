"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageProvider";
import type { Lang } from "../../i18n/translations";
import NewspaperTitle from "../../i18n/NewspaperTitle";
import {
  FaBorderAll,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type Localized = Record<Lang, string>;

export type Project = {
  title: Localized;
  category: Localized;
  year: string;
  image?: string;
  color?: string;
  liveUrl?: string;
  repoUrl?: string;
};

const projectUrl = (p: Project) => p.liveUrl ?? p.repoUrl;

type Filter = "all" | "live" | "repo";

const FILTERS: { id: Filter; Icon: IconType }[] = [
  { id: "all", Icon: FaBorderAll },
  { id: "live", Icon: FaGlobe },
  { id: "repo", Icon: FaGithub },
];

const COLORS = {
  bg: "var(--color-3)",
  text: "var(--color-1)",
  fallback: "var(--color-5)",
  shade: "var(--color-6)",
};

const PAGE_W = "clamp(150px, 34vw, 400px)";

type Props = {
  projects: Project[];
  background?: string;
};

const DRAG_STEP = 110;
const VISIBLE_DEPTH = 3;

export default function ProjectsMagazine({
  projects: allProjects,
  background = COLORS.bg,
}: Props) {
  const { t, lang } = useLanguage();

  const [filter, setFilter] = useState<Filter>("all");
  const projects = useMemo(
    () =>
      allProjects.filter((p) =>
        filter === "live"
          ? !!p.liveUrl
          : filter === "repo"
            ? !!p.repoUrl
            : true,
      ),
    [allProjects, filter],
  );

  const maxIndex = Math.max(projects.length - 2, 0);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex)),
    [maxIndex],
  );

  const open = useCallback((project: Project) => {
    const url = projectUrl(project);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const drag = useRef({
    active: false,
    startX: 0,
    startIndex: 0,
    moved: false,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startIndex: index,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    go(d.startIndex - Math.round(dx / DRAG_STEP));
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  const wheelLock = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 12) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setIndex((i) =>
        Math.min(Math.max(i + (delta > 0 ? 1 : -1), 0), maxIndex),
      );
      setTimeout(() => (wheelLock.current = false), 450);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [maxIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  const onPageClick = (k: number) => {
    if (drag.current.moved) return;
    if (k === index || k === index + 1) {
      open(projects[k]);
    } else if (k < index) {
      go(k);
    } else {
      go(k - 1);
    }
  };

  return (
    <section
      id="projects"
      aria-roledescription={t.projects.carousel}
      aria-label={t.projects.title}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{
        position: "relative",
        width: "100%",
        height: `calc(${PAGE_W} + 330px)`,
        overflow: "hidden",
        background,
        outlineOffset: -4,
        userSelect: "none",
        color: COLORS.text,
        ["--page-w" as string]: PAGE_W,
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 z-[200] -translate-x-1/2 px-5"
        style={{
          top: "clamp(16px, 3vw, 40px)",
          width: "min(80vw, 1100px)",
          containerType: "inline-size",
        }}
      >
        <NewspaperTitle text={t.projects.title} />
      </div>

      {/* Escenario 3D */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        style={{
          position: "absolute",
          inset: "0 0 80px 0",
          perspective: "1800px",
          perspectiveOrigin: "50% 45%",
          touchAction: "pan-y",
          cursor: "grab",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {projects.map((project, k) => {
            const d = k - index;
            const side = d <= 0 ? -1 : 1;
            const n = side === -1 ? -d : d - 1;
            const visible = n <= VISIBLE_DEPTH;
            const isCenter = n === 0;

            const x = side * (52 + n * 34);
            const rotY = -side * (24 + Math.min(n, 3) * 6);
            const rotZ = side * -1.5 + n * side * -0.6;
            const z = -n * 140;
            const y = n * -2;

            return (
              <article
                key={project.title.es}
                role="group"
                aria-roledescription={t.projects.page}
                aria-label={`${project.title[lang]}, ${k + 1} ${t.projects.of} ${projects.length}`}
                onClick={() => onPageClick(k)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: PAGE_W,
                  aspectRatio: "1 / 1",
                  transform: `translate(-50%, -50%) translate3d(${x}%, ${y}%, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
                  transition:
                    "transform 900ms cubic-bezier(.22,1,.36,1), opacity 600ms ease",
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? "auto" : "none",
                  zIndex: 100 - n,
                  cursor: isCenter ? "pointer" : "grab",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    background: project.color ?? COLORS.fallback,
                  }}
                >
                  {project.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title[lang]}
                      draggable={false}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: COLORS.shade,
                      opacity: Math.min(n * 0.14, 0.5),
                      transition: "opacity 600ms ease",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Texto: solo visible mientras la página está al centro */}
                <div
                  aria-hidden={!isCenter}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    paddingTop: "clamp(10px, 1.5vw, 20px)",
                    textAlign: "center",
                    color: COLORS.text,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0)" : "translateY(-12px)",
                    transition: isCenter
                      ? "opacity 500ms ease 350ms, transform 500ms ease 350ms"
                      : "opacity 200ms ease, transform 200ms ease",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(16px, 1.8vw, 26px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title[lang]}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    {project.category[lang]}, {project.year}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Filtro */}
      <div
        role="tablist"
        aria-label={t.projects.filterLabel}
        style={{
          position: "absolute",
          bottom: "clamp(16px, 3vw, 40px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 200,
        }}
      >
        {FILTERS.map(({ id, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            aria-label={t.projects.filters[id]}
            title={t.projects.filters[id]}
            onClick={() => {
              setFilter(id);
              setIndex(0);
            }}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${COLORS.text}`,
              background: filter === id ? COLORS.text : "transparent",
              color: filter === id ? background : COLORS.text,
              cursor: "pointer",
            }}
          >
            <Icon size={18} aria-hidden="true" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        aria-label={t.projects.prev}
        className={`${NAV_BASE} left-4 md:left-[max(8px,calc(50%_-_var(--page-w)_*_1.02_-_60px))]`}
        style={navBtn(index === 0)}
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        disabled={index === maxIndex}
        aria-label={t.projects.next}
        className={`${NAV_BASE} right-4 md:right-[max(8px,calc(50%_-_var(--page-w)_*_1.02_-_60px))]`}
        style={navBtn(index === maxIndex)}
      >
        <FaChevronRight aria-hidden="true" />
      </button>
    </section>
  );
}

const NAV_BASE =
  "absolute z-[200] flex h-11 w-11 items-center justify-center " +
  "bottom-[clamp(16px,3vw,40px)] md:bottom-auto md:top-[calc((100%_-_80px)_/_2)] md:-translate-y-1/2";

function navBtn(disabled: boolean): React.CSSProperties {
  return {
    border: `2px solid ${COLORS.text}`,
    background: "transparent",
    color: COLORS.text,
    fontSize: 18,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
  };
}

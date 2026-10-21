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
  description?: Localized;
  metric?: Localized;
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
  bg: "var(--proj-bg)",
  text: "var(--color-1)",
  fallback: "var(--color-5)",
  shade: "var(--color-6)",
};

const PAGE_W = "clamp(150px, 34vw, 400px)";
const PAGE_W_MOBILE = "min(84vw, 420px)";
const MOBILE_QUERY = "(max-width: 767px)";

type Props = {
  projects: Project[];
  background?: string;
};

// Sube las tarjetas para dejar espacio al texto, la etiqueta y el botón, sin tapar los filtros
const CARD_SHIFT = 30;
const DRAG_STEP = 110;
const DRAG_STEP_MOBILE = 70;
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pageW = isMobile ? PAGE_W_MOBILE : PAGE_W;
  const maxIndex = Math.max(projects.length - (isMobile ? 1 : 2), 0);
  const [rawIndex, setIndex] = useState(0);
  const index = Math.min(rawIndex, maxIndex);

  // Proyectos con texto visible: uno en móvil; dos páginas centrales en escritorio.
  // offset = distancia horizontal del centro, en anchos de página (ver `x` de las tarjetas)
  const infoItems = (
    isMobile
      ? [{ project: projects[index], offset: 0 }]
      : [
          { project: projects[index], offset: -0.52 },
          { project: projects[index + 1], offset: 0.52 },
        ]
  ).filter((item) => item.project);

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
    go(
      d.startIndex -
        Math.round(dx / (isMobile ? DRAG_STEP_MOBILE : DRAG_STEP)),
    );
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
      // Solo el gesto horizontal mueve el carrusel; el scroll vertical sigue de largo
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      const delta = e.deltaX;
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
    if (isMobile) {
      if (k === index) open(projects[k]);
      else go(k);
    } else if (k === index || k === index + 1) {
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
        height: `calc(${pageW} + ${isMobile ? 500 : 470}px)`,
        overflow: "hidden",
        background,
        outlineOffset: -4,
        userSelect: "none",
        color: COLORS.text,
        ["--page-w" as string]: pageW,
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

      <style>{`
        .project-img { transition: transform 1100ms cubic-bezier(.22,1,.36,1); transform: scale(1.12); }
        .project-img[data-center="true"] { transform: scale(1); }
        .projects-stage { animation: projects-in 700ms cubic-bezier(.22,1,.36,1); }
        @keyframes projects-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .project-info { animation: info-in 500ms ease 250ms both; }
        @keyframes info-in { from { opacity: 0; margin-top: 10px; } to { opacity: 1; margin-top: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .project-img, .projects-stage, .project-info { transition: none; animation: none; }
        }
      `}</style>

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
          key={filter}
          className="projects-stage"
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {projects.map((project, k) => {
            const d = k - index;
            const side = d <= 0 ? -1 : 1;
            const n = isMobile ? Math.abs(d) : side === -1 ? -d : d - 1;
            const visible = isMobile ? n <= 1 : n <= VISIBLE_DEPTH;
            const isCenter = isMobile ? d === 0 : n === 0;

            // Móvil: una página a todo el ancho; las vecinas salen por los lados
            const x = isMobile ? d * 112 : side * (52 + n * 34);
            const rotY = isMobile ? 0 : -side * (24 + Math.min(n, 3) * 6);
            const rotZ = isMobile ? 0 : side * -1.5 + n * side * -0.6;
            const z = isMobile ? 0 : -n * 140;
            const y = isMobile ? 0 : n * -2;

            return (
              <article
                key={project.title.es}
                role="group"
                aria-roledescription={t.projects.page}
                aria-label={`${project.title[lang]}, ${k + 1} ${t.projects.of} ${projects.length}`}
                onClick={() => onPageClick(k)}
                style={{
                  position: "absolute",
                  top: `calc(50% - ${CARD_SHIFT}px)`,
                  left: "50%",
                  width: pageW,
                  aspectRatio: "1 / 1",
                  transform: `translate(-50%, -50%) translate3d(${x}%, ${y}%, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${isCenter ? 1 : 0.94})`,
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
                    borderRadius: 16,
                    background: project.color ?? COLORS.fallback,
                    boxShadow: isCenter
                      ? "0 18px 40px rgba(0,0,0,0.35)"
                      : "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "box-shadow 700ms ease",
                  }}
                >
                  {project.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title[lang]}
                      draggable={false}
                      loading="lazy"
                      className="project-img"
                      data-center={isCenter}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Si la imagen remota falla, queda el color de fondo
                        e.currentTarget.style.display = "none";
                      }}
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

              </article>
            );
          })}
        </div>
      </div>

      {/* Texto: capa plana (sin 3D) para que el botón siempre reciba el mouse */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 80px 0",
          zIndex: 150,
          pointerEvents: "none",
        }}
      >
        {infoItems.map(({ project, offset }) => (
          <div
            key={`${filter}-${project.title.es}`}
            className="project-info"
            style={{
              position: "absolute",
              top: `calc(50% - ${CARD_SHIFT}px + ${pageW} / 2 + clamp(10px, 1.5vw, 20px))`,
              left: `calc(50% + ${offset} * ${pageW})`,
              width: pageW,
              transform: "translateX(-50%)",
              textAlign: "center",
              color: COLORS.text,
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
            <div style={{ fontSize: 12, marginTop: 2, opacity: 0.7 }}>
              {project.year}
            </div>
            {project.description && (
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.4,
                  margin: "6px auto 0",
                  maxWidth: "min(92%, 460px)",
                  opacity: 0.9,
                }}
              >
                {project.description[lang]}
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                marginTop: 10,
              }}
            >
              {project.metric && (
                <span style={TAG_STYLE}>{project.metric[lang]}</span>
              )}
              {projectUrl(project) && (
                <a
                  href={projectUrl(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{
                    ...TAG_STYLE,
                    textDecoration: "none",
                    pointerEvents: "auto",
                    cursor: "pointer",
                  }}
                >
                  {project.liveUrl ? t.projects.viewSite : t.projects.viewCode}
                </a>
              )}
            </div>
          </div>
        ))}
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
              borderRadius: 999,
              border: `1.5px solid ${COLORS.text}`,
              background: filter === id ? COLORS.text : "transparent",
              color: filter === id ? background : COLORS.text,
              cursor: "pointer",
            }}
          >
            <Icon size={18} aria-hidden="true" />
          </button>
        ))}
      </div>

      {!isMobile && (
        <>
      <button
        type="button"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        aria-label={t.projects.prev}
        className={`${NAV_BASE} left-2 md:left-[max(8px,calc(50%_-_var(--page-w)_*_1.02_-_60px))]`}
        style={navBtn(index === 0)}
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        disabled={index === maxIndex}
        aria-label={t.projects.next}
        className={`${NAV_BASE} right-2 md:right-[max(8px,calc(50%_-_var(--page-w)_*_1.02_-_60px))]`}
        style={navBtn(index === maxIndex)}
      >
        <FaChevronRight aria-hidden="true" />
      </button>
        </>
      )}
    </section>
  );
}

const TAG_STYLE: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: 999,
  background: COLORS.text,
  color: COLORS.bg,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.2,
};

const NAV_BASE =
  "absolute z-[200] hidden h-11 w-11 items-center justify-center md:flex " +
  "top-[calc((100%_-_80px)_/_2_-_30px)] -translate-y-1/2";

function navBtn(disabled: boolean): React.CSSProperties {
  return {
    border: "none",
    borderRadius: "50%",
    background: COLORS.text,
    color: COLORS.bg,
    fontSize: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.3 : 1,
  };
}

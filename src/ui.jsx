import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sprout, Globe, Menu } from "lucide-react";
import { useLang, t } from "./lang.jsx";

/* Природная агро-палитра — та же, что в AgroLens, чтобы два сайта читались как система. */
export const C = {
  BG:     "#f4f1e8",
  BG_ALT: "#ebe6d6",
  CARD:   "#fbfaf4",
  PANEL:  "#f0ecdf",
  INK:    "#2a2e22",
  MUTED:  "#6f7359",
  LEAF:   "#3d6b3a",
  LEAF_D: "#2f5430",
  RIPE:   "#d99a2b",
  EARTH:  "#a8763e",
  CLAY:   "#c05a3a",
  STEEL:  "#5f7a86",
  LINE:   "rgba(90,80,50,0.16)",
};

export const GRADE_COLOR = { A: C.LEAF, B: C.RIPE, C: C.CLAY };

/* Общий CSS, подключается один раз в каждом экране через <StyleTag/>. */
export const BASE_CSS = `
.tb { font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: ${C.INK}; background: ${C.BG}; min-height: 100vh; }
.tb-display { font-family: Sora, Inter, sans-serif; }
.tb-num { font-family: Sora, Inter, sans-serif; font-feature-settings: "tnum"; }
.tb-eyebrow { font-family: Sora, sans-serif; letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; font-weight: 700; }
.tb-btn { transition: transform .16s ease, background .16s ease, box-shadow .16s ease; }
.tb-btn:hover { transform: translateY(-1px); }
.tb-card { background: ${C.CARD}; border: 1px solid ${C.LINE}; border-radius: 16px; }
.tb-card-h { transition: transform .3s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .3s; }
.tb-card-h:hover { transform: translateY(-5px); border-color: rgba(61,107,58,0.5); box-shadow: 0 16px 40px rgba(61,80,40,0.12); }
.tb-input { background: #fff; border: 1px solid ${C.LINE}; color: ${C.INK}; border-radius: 10px; }
.tb-input:focus { outline: none; border-color: ${C.LEAF}; }
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); }
.reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
`;

export function StyleTag({ extra = "" }) {
  return <style>{BASE_CSS + extra}</style>;
}

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 rounded-full px-1 py-1"
         style={{ background: C.PANEL, border: `1px solid ${C.LINE}` }}>
      <Globe size={13} style={{ color: C.MUTED, marginLeft: 4 }} />
      {["ru", "en", "az"].map((l) => (
        <button key={l} onClick={() => setLang(l)}
          className="tb-btn rounded-full px-2 py-0.5 text-xs font-semibold uppercase"
          style={{ background: lang === l ? C.LEAF : "transparent", color: lang === l ? "#fff" : C.MUTED }}>
          {l}
        </button>
      ))}
    </div>
  );
}

/* Шапка с навигацией. active — какой пункт подсветить. */
export function Header() {
  const { lang } = useLang();
  const T = (k) => t(lang, k);
  const loc = useLocation();
  const [open, setOpen] = React.useState(false);

  const links = [
    { to: "/catalog", label: T("nav_catalog") },
    { to: "/new",     label: T("nav_new") },
    { to: "/deals",   label: T("nav_deals") },
  ];
  const isActive = (to) => loc.pathname === to;

  return (
    <header className="sticky top-0 z-40 backdrop-blur"
            style={{ background: "rgba(244,241,232,0.85)", borderBottom: `1px solid ${C.LINE}` }}>
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid place-items-center rounded-lg" style={{ width: 32, height: 32, background: C.LEAF }}>
            <Sprout size={18} color="#fff" />
          </div>
          <span className="tb-display text-lg font-extrabold tracking-tight" style={{ color: C.INK }}>{T("brand")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className="transition font-medium"
              style={{ color: isActive(l.to) ? C.LEAF : C.MUTED }}>
              {l.label}
            </Link>
          ))}
          <Link to="/#halal" className="transition font-medium" style={{ color: C.MUTED }}>{T("nav_halal")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link to="/new" className="tb-btn hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: C.LEAF, color: "#fff" }}>
            {T("nav_new")}
          </Link>
          <button className="md:hidden tb-btn grid place-items-center rounded-lg" style={{ width: 36, height: 36, border: `1px solid ${C.LINE}` }}
                  onClick={() => setOpen((v) => !v)} aria-label="menu">
            <Menu size={18} color={C.INK} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-2" style={{ borderTop: `1px solid ${C.LINE}` }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium" style={{ color: isActive(l.to) ? C.LEAF : C.MUTED }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

/* Компактный бейдж сорта A/B/C */
export function GradeBadge({ grade, size = 28 }) {
  const col = GRADE_COLOR[grade] || C.MUTED;
  return (
    <span className="tb-num inline-grid place-items-center font-bold text-white rounded-md"
          style={{ width: size, height: size, background: col, fontSize: size * 0.5 }}>
      {grade}
    </span>
  );
}

/* Хук scroll-reveal */
export function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

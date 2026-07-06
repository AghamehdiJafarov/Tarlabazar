import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout, ArrowRight, Store, PackageCheck, Landmark, ShieldCheck,
  Ban, Scale, FileCheck, Sun, HandCoins, Leaf, Users, Play, Download,
} from "lucide-react";
import { useLang, t } from "./lang.jsx";
import { C, StyleTag, Header, useReveal } from "./ui.jsx";

// ↓ ВСТАВЬ СЮДА ID своего YouTube-ролика (часть после watch?v= или youtu.be/).
// Пример: из https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  YT_ID = "dQw4w9WgXcQ"
// Пока стоит REPLACE — на сайте показывается аккуратная заглушка вместо ролика.
const YT_ID = "REPLACE_WITH_YOUTUBE_ID";

// Имя файла презентации. Положи PDF с этим именем в папку public/ — кнопка его скачает.
const DECK_FILE = "/TarlaBazar.pdf";

const HERO_CSS = `
@keyframes tbGrad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
.tb-hero {
  background: radial-gradient(1100px 640px at 12% 6%, rgba(61,107,58,0.14), transparent 60%),
              radial-gradient(900px 560px at 88% 20%, rgba(217,154,43,0.16), transparent 55%),
              linear-gradient(160deg, #f6f3ea, ${C.BG} 45%, #efe9d8);
  background-size: 180% 180%; animation: tbGrad 24s ease-in-out infinite;
}
@keyframes flowDash { to { stroke-dashoffset: -22; } }
.tb-flow { stroke-dasharray: 6 5; animation: flowDash 1.1s linear infinite; }
@media (prefers-reduced-motion: reduce){ .tb-hero,.tb-flow{ animation:none !important; } }
`;

function Eyebrow({ children, color = C.LEAF }) {
  return <div className="tb-eyebrow reveal" style={{ color }}>{children}</div>;
}

/* Иллюстрация hero: поле → (прямая линия) → покупатель, без узлов-перекупщиков между ними. */
function DirectLink({ T }) {
  return (
    <div className="relative w-full" style={{ maxWidth: 470 }}>
      <div className="tb-card relative rounded-2xl p-6" style={{ boxShadow: "0 20px 50px rgba(61,80,40,0.14)" }}>
        <svg viewBox="0 0 420 240" className="w-full">
          {/* фермер слева */}
          <g>
            <circle cx="62" cy="120" r="46" fill="rgba(61,107,58,0.12)" stroke={C.LEAF} strokeWidth="2" />
            <g transform="translate(62,120)">
              <path d="M0 -20 C14 -34 34 -20 30 2 C42 20 18 40 0 34 C-18 40 -42 20 -30 2 C-34 -20 -14 -34 0 -20 Z" fill="#c04a30" />
              <path d="M0 -20 C-14 -34 -34 -20 -30 2 C-38 18 -22 36 -6 34 C-16 20 -18 -2 -8 -14 C-4 -18 -2 -20 0 -20 Z" fill="#5c8a3a" opacity="0.55" />
              <path d="M2 -22 C6 -32 12 -34 16 -34" fill="none" stroke="#6b4a1a" strokeWidth="3" strokeLinecap="round" />
            </g>
            <text x="62" y="188" textAnchor="middle" className="tb-display" style={{ fontSize: 13, fontWeight: 700, fill: C.INK }}>
              {T("how1_h").split(" ")[0]}
            </text>
          </g>

          {/* прямая связь — анимированная линия, БЕЗ узлов посередине */}
          <line x1="112" y1="120" x2="308" y2="120" stroke={C.LEAF} strokeWidth="3" className="tb-flow" />
          <g transform="translate(210,120)">
            <circle r="17" fill={C.CARD} stroke={C.RIPE} strokeWidth="2" />
            <path d="M-6 0 L-1 5 L7 -5" stroke={C.LEAF} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* покупатель справа */}
          <g>
            <circle cx="358" cy="120" r="46" fill="rgba(217,154,43,0.14)" stroke={C.RIPE} strokeWidth="2" />
            <g transform="translate(358,120)">
              <rect x="-20" y="-16" width="40" height="30" rx="4" fill="#a8763e" />
              <rect x="-20" y="-16" width="40" height="9" rx="4" fill="#8a5f30" />
              <path d="M-12 -16 L-8 -26 L8 -26 L12 -16" fill="none" stroke="#8a5f30" strokeWidth="3" />
            </g>
            <text x="358" y="188" textAnchor="middle" className="tb-display" style={{ fontSize: 13, fontWeight: 700, fill: C.INK }}>
              {T("how2_h").split(" ")[0]}
            </text>
          </g>
        </svg>

        <div className="mt-2 text-center text-sm font-medium" style={{ color: C.MUTED }}>
          {T("tagline")}
        </div>
      </div>

      {/* плавающие бейджи-метрики */}
      <div className="tb-card absolute -right-3 top-4 rounded-xl px-3 py-2" style={{ border: `1px solid rgba(192,90,58,0.4)`, boxShadow: "0 8px 20px rgba(61,80,40,0.12)" }}>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: C.MUTED }}>{T("hero_stat1_l")}</div>
        <div className="tb-num text-base font-bold" style={{ color: C.CLAY }}>{T("hero_stat1_v")}</div>
      </div>
      <div className="tb-card absolute -left-3 bottom-6 rounded-xl px-3 py-2" style={{ border: `1px solid rgba(61,107,58,0.4)`, boxShadow: "0 8px 20px rgba(61,80,40,0.12)" }}>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: C.MUTED }}>{T("hero_stat3_l")}</div>
        <div className="tb-num text-base font-bold" style={{ color: C.LEAF }}>{T("hero_stat3_v")}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  useReveal();
  const { lang } = useLang();
  const T = (k) => t(lang, k);

  const steps = [
    { ic: Store,        color: C.LEAF,  h: T("how1_h"), p: T("how1_p") },
    { ic: PackageCheck, color: C.RIPE,  h: T("how2_h"), p: T("how2_p") },
    { ic: Landmark,     color: C.EARTH, h: T("how3_h"), p: T("how3_p") },
  ];

  const principles = [
    { ic: Ban,        color: C.CLAY,  h: T("halal1_h"), p: T("halal1_p") },
    { ic: HandCoins,  color: C.LEAF,  h: T("halal2_h"), p: T("halal2_p") },
    { ic: Scale,      color: C.RIPE,  h: T("halal3_h"), p: T("halal3_p") },
    { ic: Sun,        color: C.EARTH, h: T("halal4_h"), p: T("halal4_p") },
    { ic: ShieldCheck,color: C.STEEL, h: T("halal5_h"), p: T("halal5_p") },
  ];

  return (
    <div className="tb">
      <StyleTag extra={HERO_CSS} />
      <Header />

      {/* HERO */}
      <section className="tb-hero">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>{T("hero_eyebrow")}</Eyebrow>
            <h1 className="tb-display mt-4 font-extrabold leading-[1.08] reveal"
                style={{ fontSize: "clamp(30px, 4.4vw, 52px)", whiteSpace: "pre-line", color: C.INK }}>
              {T("hero_h")}
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed reveal" style={{ color: "#4d5340", maxWidth: 560 }}>
              {T("hero_p")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 reveal">
              <Link to="/catalog" className="tb-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                    style={{ background: C.LEAF, color: "#fff", boxShadow: "0 10px 30px rgba(61,107,58,0.32)" }}>
                {T("hero_cta_buy")} <ArrowRight size={17} />
              </Link>
              <Link to="/new" className="tb-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                    style={{ border: `1px solid ${C.EARTH}`, color: C.EARTH }}>
                <Sprout size={16} /> {T("hero_cta_sell")}
              </Link>
              <a href="#promo" className="tb-btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                 style={{ color: C.MUTED }}>
                <Play size={15} /> {T("vid_watch")}
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end reveal">
            <DirectLink T={T} />
          </div>
        </div>
      </section>

      {/* ПРОБЛЕМА */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <Eyebrow color={C.CLAY}>{T("prob_eyebrow")}</Eyebrow>
            <h2 className="tb-display mt-4 text-3xl md:text-[34px] font-extrabold leading-tight reveal" style={{ color: C.INK }}>
              {T("prob_h")}
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed reveal" style={{ color: "#4d5340" }}>
            {T("prob_p")}
          </p>
        </div>
      </section>

      {/* КАК РАБОТАЕТ */}
      <section id="how" className="border-y" style={{ borderColor: C.LINE, background: C.BG_ALT }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Eyebrow>{T("how_eyebrow")}</Eyebrow>
          <h2 className="tb-display mt-4 text-3xl md:text-[34px] font-extrabold leading-tight reveal" style={{ maxWidth: 620, color: C.INK }}>
            {T("how_h")}
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {steps.map((s, i) => {
              const Ic = s.ic;
              return (
                <div key={i} className="reveal relative">
                  <div className="tb-num text-5xl font-extrabold" style={{ color: "rgba(61,107,58,0.22)" }}>{i + 1}</div>
                  <div className="grid place-items-center rounded-xl -mt-3 mb-3" style={{ width: 46, height: 46, background: `${s.color}1c`, border: `1px solid ${s.color}55` }}>
                    <Ic size={22} color={s.color} />
                  </div>
                  <h3 className="tb-display text-lg font-bold" style={{ color: C.INK }}>{s.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#575c46" }}>{s.p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ПРОМО-ВИДЕО */}
      <section id="promo" className="mx-auto max-w-4xl px-5 py-20">
        <div className="reveal mb-10 text-center">
          <div className="tb-eyebrow mb-3" style={{ color: C.RIPE }}>{T("vid_eyebrow")}</div>
          <h2 className="tb-display font-extrabold mb-3" style={{ fontSize: "clamp(1.6rem,3.4vw,2.4rem)", color: C.INK }}>{T("vid_h")}</h2>
          <p style={{ color: C.MUTED }}>{T("vid_p")}</p>
        </div>
        <div className="reveal rounded-3xl overflow-hidden" style={{ border: `1px solid ${C.LINE}`, boxShadow: "0 24px 60px rgba(61,80,40,0.16)" }}>
          <div style={{ position: "relative", paddingTop: "56.25%", background: C.PANEL }}>
            {YT_ID === "REPLACE_WITH_YOUTUBE_ID" ? (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: 24 }}>
                <div className="grid place-items-center rounded-full" style={{ width: 64, height: 64, background: `${C.RIPE}22`, border: `1px solid ${C.RIPE}66` }}>
                  <Play size={30} color={C.RIPE} />
                </div>
                <div className="tb-display font-semibold" style={{ color: C.INK }}>{T("vid_placeholder_h")}</div>
                <div className="text-sm" style={{ color: C.MUTED, maxWidth: 380 }}>{T("vid_placeholder_p")}</div>
              </div>
            ) : (
              <iframe
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                src={"https://www.youtube-nocookie.com/embed/" + YT_ID}
                title="TarlaBazar promo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* КАК ЗАЩИЩЕНА СДЕЛКА */}
      <section id="halal" className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow color={C.LEAF_D}>{T("halal_eyebrow")}</Eyebrow>
        <h2 className="tb-display mt-4 text-3xl md:text-[34px] font-extrabold leading-tight reveal" style={{ maxWidth: 680, color: C.INK }}>
          {T("halal_h")}
        </h2>
        <p className="mt-4 text-[15px] reveal" style={{ color: C.MUTED, maxWidth: 640 }}>{T("halal_p")}</p>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {principles.map((p, i) => {
            const Ic = p.ic;
            const wide = i === 4; // пятый на всю ширину
            return (
              <div key={i} className={`tb-card tb-card-h reveal p-6 ${wide ? "md:col-span-2" : ""}`}
                   style={{ borderColor: `${p.color}44` }}>
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center rounded-xl shrink-0" style={{ width: 46, height: 46, background: `${p.color}1c`, border: `1px solid ${p.color}55` }}>
                    <Ic size={22} color={p.color} />
                  </div>
                  <div>
                    <h3 className="tb-display text-lg font-bold" style={{ color: C.INK }}>{p.h}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#575c46" }}>{p.p}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm leading-relaxed reveal rounded-xl p-4"
           style={{ color: "#575c46", background: C.BG_ALT, border: `1px solid ${C.LINE}` }}>
          <Leaf size={15} color={C.LEAF} className="inline mr-2 -mt-0.5" />
          {T("halal_note")}
        </p>
      </section>

      {/* ПРЕЗЕНТАЦИЯ */}
      <section className="border-y" style={{ borderColor: C.LINE, background: C.BG_ALT }}>
        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="tb-card reveal p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="grid place-items-center rounded-xl shrink-0" style={{ width: 48, height: 48, background: `${C.EARTH}1c`, border: `1px solid ${C.EARTH}55` }}>
                <FileCheck size={24} color={C.EARTH} />
              </div>
              <div>
                <div className="tb-eyebrow mb-2" style={{ color: C.EARTH }}>{T("deck_eyebrow")}</div>
                <h2 className="tb-display font-bold text-xl mb-1.5" style={{ color: C.INK }}>{T("deck_h")}</h2>
                <p className="text-sm" style={{ color: "#575c46" }}>{T("deck_p")}</p>
              </div>
            </div>
            <a href={DECK_FILE} download
               className="tb-btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shrink-0"
               style={{ background: C.EARTH, color: "#fff", boxShadow: "0 10px 26px rgba(168,118,62,0.3)" }}>
              <Download size={16} /> {T("deck_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: C.LINE, background: C.BG_ALT }}>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h2 className="tb-display text-3xl md:text-4xl font-extrabold reveal" style={{ color: C.INK }}>{T("final_h")}</h2>
          <p className="mt-4 text-[15px] reveal mx-auto" style={{ color: "#575c46", maxWidth: 520 }}>{T("final_p")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 reveal">
            <Link to="/catalog" className="tb-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold"
                  style={{ background: C.LEAF, color: "#fff", boxShadow: "0 12px 34px rgba(61,107,58,0.36)" }}>
              {T("hero_cta_buy")} <ArrowRight size={18} />
            </Link>
            <Link to="/new" className="tb-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
                  style={{ border: `1px solid ${C.EARTH}`, color: C.EARTH }}>
              <Sprout size={17} /> {T("hero_cta_sell")}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: C.LINE }}>
        <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center rounded-md" style={{ width: 24, height: 24, background: C.LEAF }}>
              <Sprout size={14} color="#fff" />
            </div>
            <span className="tb-display font-bold" style={{ color: C.INK }}>{T("brand")}</span>
          </div>
          <p className="text-xs" style={{ color: C.MUTED }}>{T("foot")}</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Sprout, PackageOpen, MapPin, Info, Trash2 } from "lucide-react";
import { useLang, t, CROPS, REGIONS, GRADES } from "./lang.jsx";
import { C, StyleTag, Header, GradeBadge, useReveal } from "./ui.jsx";
import { useStore } from "./store.jsx";

const CROP_TINT = {
  apple: "#c0492f", tomato: "#c0492f", pomegranate: "#a8324f", cherry: "#8a2b3f",
  citrus: "#d9822b", persimmon: "#d9822b", hazelnut: "#8a6a3a", grape: "#6a4a7a",
  potato: "#a8763e", onion: "#c9a52a", other: "#6f7359",
};

export default function Catalog() {
  useReveal();
  const { lang } = useLang();
  const T = (k) => t(lang, k);
  const { listings, clearAll } = useStore();

  const [fCrop, setFCrop] = useState("");
  const [fReg, setFReg] = useState("");
  const [fGrade, setFGrade] = useState("");

  const filtered = useMemo(() => listings.filter((l) =>
    (!fCrop || l.crop === fCrop) && (!fReg || l.region === fReg) && (!fGrade || l.grade === fGrade)
  ), [listings, fCrop, fReg, fGrade]);

  const empty = listings.length === 0;

  return (
    <div className="tb">
      <StyleTag />
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="tb-eyebrow" style={{ color: C.LEAF }}>{T("nav_catalog")}</div>
            <h1 className="tb-display mt-2 text-2xl font-extrabold" style={{ color: C.INK }}>{T("cat_title")}</h1>
            <p className="mt-2 text-sm" style={{ color: C.MUTED, maxWidth: 560 }}>{T("cat_sub")}</p>
          </div>
          {!empty && (
            <button onClick={() => { if (confirm(T("reset_confirm"))) clearAll(); }}
                    className="tb-btn inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium"
                    style={{ border: `1px solid ${C.LINE}`, color: C.MUTED }}>
              <Trash2 size={14} /> {T("reset_data")}
            </button>
          )}
        </div>

        {/* фильтры */}
        {!empty && (
          <div className="mt-6 flex flex-wrap gap-3">
            <FilterSelect label={T("cat_filter_crop")} value={fCrop} onChange={setFCrop}
                          options={[["", T("cat_filter_all")], ...CROPS.map((c) => [c, T("crop_" + c)])]} />
            <FilterSelect label={T("cat_filter_region")} value={fReg} onChange={setFReg}
                          options={[["", T("cat_filter_all")], ...REGIONS.map((r) => [r, T("reg_" + r)])]} />
            <FilterSelect label={T("cat_filter_grade")} value={fGrade} onChange={setFGrade}
                          options={[["", T("cat_filter_all")], ...GRADES.map((g) => [g, g])]} />
            <div className="flex items-end">
              <span className="tb-num text-sm font-semibold px-2 py-2" style={{ color: C.MUTED }}>
                {filtered.length} {T("cat_count")}
              </span>
            </div>
          </div>
        )}

        {/* каркас-подсказка */}
        {!empty && (
          <p className="mt-4 text-[12px] leading-relaxed rounded-lg p-3"
             style={{ color: C.MUTED, background: C.PANEL, border: `1px solid ${C.LINE}` }}>
            <Info size={13} className="inline mr-1.5 -mt-0.5" /> {T("cat_demo_hint")}
          </p>
        )}

        {/* пустое состояние — честное */}
        {empty ? (
          <div className="tb-card mt-8 p-12 grid place-items-center text-center">
            <div className="grid place-items-center rounded-2xl mb-5" style={{ width: 72, height: 72, background: "rgba(61,107,58,0.1)", border: `1px solid ${C.LINE}` }}>
              <PackageOpen size={34} color={C.LEAF} />
            </div>
            <h2 className="tb-display text-xl font-bold" style={{ color: C.INK }}>{T("cat_empty_h")}</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: C.MUTED, maxWidth: 440 }}>{T("cat_empty_p")}</p>
            <Link to="/new" className="tb-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                  style={{ background: C.LEAF, color: "#fff" }}>
              <Sprout size={16} /> {T("cat_empty_btn")}
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="tb-card mt-8 p-10 text-center">
            <p className="text-sm" style={{ color: C.MUTED }}>{T("cat_filter_all")} — 0 {T("cat_count")}</p>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((l) => <LotCard key={l.id} lot={l} T={T} />)}
          </div>
        )}
      </main>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium block mb-1" style={{ color: C.MUTED }}>{label}</span>
      <select className="tb-input px-3 py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
      </select>
    </label>
  );
}

function LotCard({ lot, T }) {
  const tint = CROP_TINT[lot.crop] || C.MUTED;
  return (
    <Link to={"/listing/" + lot.id} className="tb-card tb-card-h block overflow-hidden">
      {/* цветная шапка карточки под культуру */}
      <div className="relative" style={{ height: 96, background: `linear-gradient(135deg, ${tint}22, ${tint}0d)` }}>
        <div className="absolute inset-0 grid place-items-center">
          <Sprout size={34} color={tint} style={{ opacity: 0.55 }} />
        </div>
        <div className="absolute top-3 right-3">
          <GradeBadge grade={lot.grade} size={30} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="tb-display text-lg font-bold" style={{ color: C.INK }}>{T("crop_" + lot.crop)}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs" style={{ color: C.MUTED }}>
          <MapPin size={13} /> {T("reg_" + lot.region)} · {lot.farm}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide" style={{ color: C.MUTED }}>{T("card_per_kg")}</div>
            <div className="tb-num text-2xl font-extrabold" style={{ color: C.LEAF }}>
              {lot.price.toFixed(2)} <span className="text-sm">{T("currency")}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wide" style={{ color: C.MUTED }}>{T("card_available")}</div>
            <div className="tb-num text-base font-bold" style={{ color: C.INK }}>{lot.volume} {T("u_kg")}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

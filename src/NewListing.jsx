import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sprout, Check, Info, ArrowLeft, AlertTriangle } from "lucide-react";
import { useLang, t, CROPS, REGIONS, GRADES } from "./lang.jsx";
import { C, StyleTag, Header, GradeBadge } from "./ui.jsx";
import { useStore } from "./store.jsx";

export default function NewListing() {
  const { lang } = useLang();
  const T = (k) => t(lang, k);
  const nav = useNavigate();
  const { addListing } = useStore();

  const [farm, setFarm] = useState("");
  const [crop, setCrop] = useState("apple");
  const [region, setRegion] = useState("quba");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [grade, setGrade] = useState("A");
  const [harvested, setHarvested] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!crop || !volume || !price || Number(volume) <= 0 || Number(price) <= 0) {
      setErr(T("new_err_fill")); return;
    }
    if (!harvested) { setErr(T("new_err_harvest")); return; }
    const id = addListing({
      farm: farm.trim() || T("new_farm_ph"),
      crop, region,
      volume: Number(volume),
      price: Number(price),
      grade,
      note: note.trim(),
    });
    nav("/listing/" + id);
  };

  return (
    <div className="tb">
      <StyleTag />
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-8">
        <Link to="/catalog" className="tb-btn inline-flex items-center gap-1.5 text-sm mb-5" style={{ color: C.MUTED }}>
          <ArrowLeft size={16} /> {T("lot_back")}
        </Link>

        <div className="tb-eyebrow" style={{ color: C.LEAF }}>{T("nav_new")}</div>
        <h1 className="tb-display mt-2 text-2xl font-extrabold" style={{ color: C.INK }}>{T("new_title")}</h1>
        <p className="mt-2 text-sm" style={{ color: C.MUTED, maxWidth: 620 }}>{T("new_sub")}</p>

        <div className="tb-card mt-7 p-6 space-y-5">
          {/* хозяйство */}
          <Field label={T("new_farm")}>
            <input className="tb-input w-full px-3 py-2.5 text-sm" value={farm}
                   onChange={(e) => setFarm(e.target.value)} placeholder={T("new_farm_ph")} />
          </Field>

          {/* культура + регион */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={T("new_crop")}>
              <select className="tb-input w-full px-3 py-2.5 text-sm" value={crop} onChange={(e) => setCrop(e.target.value)}>
                {CROPS.map((c) => <option key={c} value={c}>{T("crop_" + c)}</option>)}
              </select>
            </Field>
            <Field label={T("new_region")}>
              <select className="tb-input w-full px-3 py-2.5 text-sm" value={region} onChange={(e) => setRegion(e.target.value)}>
                {REGIONS.map((r) => <option key={r} value={r}>{T("reg_" + r)}</option>)}
              </select>
            </Field>
          </div>

          {/* объём + цена */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={T("new_volume")}>
              <input type="number" min="1" className="tb-input tb-num w-full px-3 py-2.5 text-sm" value={volume}
                     onChange={(e) => setVolume(e.target.value)} placeholder="500" />
            </Field>
            <Field label={T("new_price")}>
              <input type="number" min="0" step="0.01" className="tb-input tb-num w-full px-3 py-2.5 text-sm" value={price}
                     onChange={(e) => setPrice(e.target.value)} placeholder="0.45" />
            </Field>
          </div>

          {/* сорт */}
          <Field label={T("new_grade")}>
            <div className="flex items-center gap-2">
              {GRADES.map((g) => (
                <button key={g} onClick={() => setGrade(g)}
                        className="tb-btn flex items-center gap-2 rounded-lg px-3 py-2"
                        style={{ border: grade === g ? `2px solid ${C.LEAF}` : `1px solid ${C.LINE}`,
                                 background: grade === g ? "rgba(61,107,58,0.08)" : "#fff" }}>
                  <GradeBadge grade={g} size={22} />
                  <span className="text-sm font-medium" style={{ color: C.INK }}>{g}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed" style={{ color: C.MUTED }}>{T("new_grade_hint")}</p>
          </Field>

          {/* КЛЮЧЕВОЕ халяльное условие: урожай собран */}
          <div className="rounded-xl p-4" style={{ background: harvested ? "rgba(61,107,58,0.08)" : "rgba(217,154,43,0.08)",
                                                    border: `1px solid ${harvested ? "rgba(61,107,58,0.4)" : "rgba(217,154,43,0.45)"}` }}>
            <label className="flex items-start gap-3 cursor-pointer">
              <button onClick={() => setHarvested((v) => !v)}
                      className="tb-btn grid place-items-center rounded-md shrink-0 mt-0.5"
                      style={{ width: 24, height: 24, background: harvested ? C.LEAF : "#fff", border: `1.5px solid ${harvested ? C.LEAF : C.RIPE}` }}>
                {harvested && <Check size={16} color="#fff" />}
              </button>
              <div>
                <div className="text-sm font-semibold" style={{ color: C.INK }}>{T("new_harvested")}</div>
                <div className="mt-1 text-[12px] leading-relaxed" style={{ color: C.MUTED }}>{T("new_harvested_req")}</div>
              </div>
            </label>
          </div>

          {/* описание */}
          <Field label={T("new_note")}>
            <textarea className="tb-input w-full px-3 py-2.5 text-sm" rows={3} value={note}
                      onChange={(e) => setNote(e.target.value)} placeholder={T("new_note_ph")} />
          </Field>

          {err && (
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm"
                 style={{ background: "rgba(192,90,58,0.1)", border: "1px solid rgba(192,90,58,0.4)", color: "#9e4527" }}>
              <AlertTriangle size={16} /> {err}
            </div>
          )}

          <button onClick={submit}
                  className="tb-btn w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold"
                  style={{ background: C.LEAF, color: "#fff" }}>
            <Sprout size={16} /> {T("new_submit")}
          </button>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium" style={{ color: C.MUTED }}>{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

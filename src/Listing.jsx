import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Sprout, PackageCheck, Landmark, Info,
  Send, Check, Trash2, AlertTriangle, ShieldCheck,
} from "lucide-react";
import { useLang, t } from "./lang.jsx";
import { C, StyleTag, Header, GradeBadge } from "./ui.jsx";
import { useStore } from "./store.jsx";

const FEE = 0.025; // 2,5% комиссия платформы за услугу — халяльное брокерство, не процент

export default function Listing() {
  const { id } = useParams();
  const { lang } = useLang();
  const T = (k) => t(lang, k);
  const nav = useNavigate();
  const { getListing, removeListing, addDeal, dealsForListing } = useStore();

  const lot = getListing(id);
  const [buyer, setBuyer] = useState("");
  const [qty, setQty] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  if (!lot) {
    return (
      <div className="tb">
        <StyleTag />
        <Header />
        <main className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h1 className="tb-display text-2xl font-extrabold" style={{ color: C.INK }}>{T("lot_notfound")}</h1>
          <p className="mt-3 text-sm" style={{ color: C.MUTED }}>{T("lot_notfound_p")}</p>
          <Link to="/catalog" className="tb-btn inline-flex items-center gap-2 mt-6 rounded-full px-5 py-2.5 text-sm font-semibold"
                style={{ background: C.LEAF, color: "#fff" }}>
            <ArrowLeft size={16} /> {T("lot_back")}
          </Link>
        </main>
      </div>
    );
  }

  const requests = dealsForListing(lot.id);
  const qn = Number(qty) || 0;
  const goods = qn * lot.price;
  const fee = goods * FEE;
  const total = goods + fee;

  const send = () => {
    if (!buyer.trim() || qn <= 0) { setErr(T("lot_err_qty")); return; }
    if (qn > lot.volume) { setErr(T("lot_err_over")); return; }
    addDeal({
      listingId: lot.id,
      listingCrop: lot.crop,
      farm: lot.farm,
      buyer: buyer.trim(),
      qty: qn,
      price: lot.price,
      goods, fee, total,
    });
    setSent(true);
    setErr("");
    setTimeout(() => nav("/deals"), 1200);
  };

  return (
    <div className="tb">
      <StyleTag />
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-8">
        <Link to="/catalog" className="tb-btn inline-flex items-center gap-1.5 text-sm mb-5" style={{ color: C.MUTED }}>
          <ArrowLeft size={16} /> {T("lot_back")}
        </Link>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          {/* левая: детали лота */}
          <div className="tb-card overflow-hidden">
            <div className="relative" style={{ height: 150, background: "linear-gradient(135deg, rgba(61,107,58,0.16), rgba(217,154,43,0.12))" }}>
              <div className="absolute inset-0 grid place-items-center">
                <Sprout size={54} color={C.LEAF} style={{ opacity: 0.5 }} />
              </div>
              <div className="absolute top-4 right-4"><GradeBadge grade={lot.grade} size={38} /></div>
            </div>
            <div className="p-6">
              <h1 className="tb-display text-2xl font-extrabold" style={{ color: C.INK }}>{T("crop_" + lot.crop)}</h1>
              <div className="mt-1.5 flex items-center gap-1.5 text-sm" style={{ color: C.MUTED }}>
                <MapPin size={14} /> {T("reg_" + lot.region)}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label={T("lot_price")} value={`${lot.price.toFixed(2)} ${T("currency")}`} sub={T("card_per_kg")} color={C.LEAF} />
                <Stat label={T("lot_volume")} value={`${lot.volume} ${T("u_kg")}`} color={C.INK} />
                <Stat label={T("lot_grade")} value={lot.grade} color={C.RIPE} />
                <Stat label={T("lot_farm")} value={lot.farm} color={C.INK} small />
              </div>

              {lot.note && (
                <p className="mt-5 text-sm leading-relaxed rounded-lg p-3" style={{ color: "#575c46", background: C.PANEL, border: `1px solid ${C.LINE}` }}>
                  {lot.note}
                </p>
              )}

              <button onClick={() => { if (confirm(T("reset_confirm"))) { removeListing(lot.id); nav("/catalog"); } }}
                      className="tb-btn inline-flex items-center gap-1.5 mt-5 text-xs" style={{ color: C.MUTED }}>
                <Trash2 size={13} /> {T("lot_remove")}
              </button>
            </div>
          </div>

          {/* правая: заявка */}
          <div className="tb-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Send size={16} color={C.LEAF} />
              <h2 className="tb-display text-base font-bold" style={{ color: C.INK }}>{T("lot_request_h")}</h2>
            </div>

            {sent ? (
              <div className="grid place-items-center text-center py-8">
                <div className="grid place-items-center rounded-full mb-3" style={{ width: 56, height: 56, background: "rgba(61,107,58,0.12)" }}>
                  <Check size={30} color={C.LEAF} />
                </div>
                <p className="text-sm font-semibold" style={{ color: C.LEAF_D }}>{T("lot_sent")}</p>
              </div>
            ) : (
              <>
                <label className="block mb-3">
                  <span className="text-xs font-medium" style={{ color: C.MUTED }}>{T("lot_buyer")}</span>
                  <input className="tb-input mt-1.5 w-full px-3 py-2.5 text-sm" value={buyer}
                         onChange={(e) => setBuyer(e.target.value)} placeholder={T("lot_buyer_ph")} />
                </label>
                <label className="block mb-4">
                  <span className="text-xs font-medium" style={{ color: C.MUTED }}>{T("lot_qty")}</span>
                  <input type="number" min="1" max={lot.volume} className="tb-input tb-num mt-1.5 w-full px-3 py-2.5 text-sm" value={qty}
                         onChange={(e) => setQty(e.target.value)} placeholder={String(Math.min(100, lot.volume))} />
                </label>

                {/* живой расчёт суммы */}
                <div className="rounded-xl p-4 mb-4" style={{ background: C.PANEL, border: `1px solid ${C.LINE}` }}>
                  <Row label={`${qn || 0} ${T("u_kg")} × ${lot.price.toFixed(2)} ${T("currency")}`} value={`${goods.toFixed(2)} ${T("currency")}`} />
                  <Row label={`${T("hero_stat2_l")} · 2,5%`} value={`${fee.toFixed(2)} ${T("currency")}`} muted />
                  <div className="h-px my-2" style={{ background: C.LINE }} />
                  <Row label={T("lot_sum")} value={`${total.toFixed(2)} ${T("currency")}`} bold />
                </div>

                {err && (
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm mb-3"
                       style={{ background: "rgba(192,90,58,0.1)", border: "1px solid rgba(192,90,58,0.4)", color: "#9e4527" }}>
                    <AlertTriangle size={16} /> {err}
                  </div>
                )}

                <button onClick={send}
                        className="tb-btn w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold"
                        style={{ background: C.LEAF, color: "#fff" }}>
                  <Send size={15} /> {T("lot_send")}
                </button>

                <p className="mt-4 text-[11px] leading-relaxed flex gap-2" style={{ color: C.MUTED }}>
                  <ShieldCheck size={26} color={C.LEAF} className="shrink-0 -mt-0.5" />
                  <span>{T("lot_fee_note")}</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* заявки на этот лот (видит фермер) */}
        {requests.length > 0 && (
          <div className="mt-8">
            <h3 className="tb-display text-sm font-bold uppercase tracking-wide mb-3" style={{ color: C.INK }}>
              {T("lot_requests_on")} · {requests.length}
            </h3>
            <div className="tb-card divide-y" style={{ borderColor: C.LINE }}>
              {requests.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: C.INK }}>{d.buyer}</div>
                    <div className="tb-num text-xs" style={{ color: C.MUTED }}>{d.qty} {T("u_kg")} · {d.total.toFixed(2)} {T("currency")}</div>
                  </div>
                  <StatusPill status={d.status} T={T} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, sub, color, small }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: C.PANEL, border: `1px solid ${C.LINE}` }}>
      <div className="text-[10px] uppercase tracking-wide" style={{ color: C.MUTED }}>{label}</div>
      <div className={`tb-num font-bold mt-0.5 ${small ? "text-sm" : "text-lg"}`} style={{ color }}>{value}</div>
      {sub && <div className="text-[10px]" style={{ color: C.MUTED }}>{sub}</div>}
    </div>
  );
}
function Row({ label, value, bold, muted }) {
  return (
    <div className="flex items-center justify-between text-sm py-0.5">
      <span style={{ color: muted ? C.MUTED : C.INK, fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span className="tb-num" style={{ color: bold ? C.LEAF : (muted ? C.MUTED : C.INK), fontWeight: bold ? 800 : 600 }}>{value}</span>
    </div>
  );
}
function StatusPill({ status, T }) {
  const map = {
    requested: [C.STEEL, T("deals_status_requested")],
    accepted:  [C.RIPE,  T("deals_status_accepted")],
    paid:      [C.EARTH, T("deals_status_paid")],
    delivered: [C.LEAF,  T("deals_status_delivered")],
    declined:  [C.CLAY,  T("deals_status_declined")],
  };
  const [col, label] = map[status] || map.requested;
  return (
    <span className="text-[11px] font-semibold rounded-full px-2.5 py-1 whitespace-nowrap"
          style={{ background: `${col}1c`, color: col, border: `1px solid ${col}55` }}>
      {label}
    </span>
  );
}

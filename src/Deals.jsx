import React from "react";
import { Link } from "react-router-dom";
import {
  Inbox, Check, X, Landmark, PackageCheck, Info, ArrowRight, Trash2,
} from "lucide-react";
import { useLang, t } from "./lang.jsx";
import { C, StyleTag, Header, useReveal } from "./ui.jsx";
import { useStore } from "./store.jsx";

/* Порядок статусов и какое действие ведёт к следующему.
   Поток отражает халяльный эскроу: деньги входят в залог у банка (paid),
   и переводятся фермеру только после подтверждения получения (delivered). */
const FLOW = {
  requested: { next: "accepted",  actionKey: "deals_accept",  color: C.RIPE,  altKey: "deals_decline", alt: "declined" },
  accepted:  { next: "paid",      actionKey: "deals_pay",     color: C.EARTH },
  paid:      { next: "delivered", actionKey: "deals_confirm", color: C.LEAF },
  delivered: null,
  declined:  null,
};

export default function Deals() {
  useReveal();
  const { lang } = useLang();
  const T = (k) => t(lang, k);
  const { deals, updateDealStatus, clearAll } = useStore();

  const empty = deals.length === 0;

  return (
    <div className="tb">
      <StyleTag />
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="tb-eyebrow" style={{ color: C.LEAF }}>{T("nav_deals")}</div>
            <h1 className="tb-display mt-2 text-2xl font-extrabold" style={{ color: C.INK }}>{T("deals_title")}</h1>
            <p className="mt-2 text-sm" style={{ color: C.MUTED, maxWidth: 560 }}>{T("deals_sub")}</p>
          </div>
          {!empty && (
            <button onClick={() => { if (confirm(T("reset_confirm"))) clearAll(); }}
                    className="tb-btn inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium"
                    style={{ border: `1px solid ${C.LINE}`, color: C.MUTED }}>
              <Trash2 size={14} /> {T("reset_data")}
            </button>
          )}
        </div>

        {empty ? (
          <div className="tb-card mt-8 p-12 grid place-items-center text-center">
            <div className="grid place-items-center rounded-2xl mb-5" style={{ width: 72, height: 72, background: "rgba(61,107,58,0.1)", border: `1px solid ${C.LINE}` }}>
              <Inbox size={34} color={C.LEAF} />
            </div>
            <h2 className="tb-display text-xl font-bold" style={{ color: C.INK }}>{T("deals_empty_h")}</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: C.MUTED, maxWidth: 440 }}>{T("deals_empty_p")}</p>
            <Link to="/catalog" className="tb-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                  style={{ background: C.LEAF, color: "#fff" }}>
              {T("nav_catalog")} <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="mt-7 space-y-4">
            {deals.map((d) => <DealCard key={d.id} deal={d} T={T} advance={updateDealStatus} />)}
          </div>
        )}
      </main>
    </div>
  );
}

function DealCard({ deal, T, advance }) {
  const flow = FLOW[deal.status];

  const statusMeta = {
    requested: [C.STEEL, T("deals_status_requested")],
    accepted:  [C.RIPE,  T("deals_status_accepted")],
    paid:      [C.EARTH, T("deals_status_paid")],
    delivered: [C.LEAF,  T("deals_status_delivered")],
    declined:  [C.CLAY,  T("deals_status_declined")],
  };
  const [sCol, sLabel] = statusMeta[deal.status] || statusMeta.requested;

  return (
    <div className="tb-card reveal p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="tb-display text-lg font-bold" style={{ color: C.INK }}>{T("crop_" + deal.listingCrop)}</span>
            <span className="text-xs" style={{ color: C.MUTED }}>· {deal.farm}</span>
          </div>
          <div className="tb-num mt-1 text-sm" style={{ color: C.MUTED }}>
            {T("deals_col_who")}: <span style={{ color: C.INK, fontWeight: 600 }}>{deal.buyer}</span>
          </div>
          <div className="tb-num mt-0.5 text-sm" style={{ color: C.MUTED }}>
            {deal.qty} {T("u_kg")} · {deal.total.toFixed(2)} {T("currency")}
          </div>
        </div>
        <span className="text-[11px] font-semibold rounded-full px-3 py-1 whitespace-nowrap"
              style={{ background: `${sCol}1c`, color: sCol, border: `1px solid ${sCol}55` }}>
          {sLabel}
        </span>
      </div>

      {/* прогресс-полоса потока */}
      <FlowBar status={deal.status} T={T} />

      {/* действия */}
      {flow && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button onClick={() => advance(deal.id, flow.next)}
                  className="tb-btn inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold"
                  style={{ background: flow.color, color: "#fff" }}>
            {flow.actionKey === "deals_pay" && <Landmark size={15} />}
            {flow.actionKey === "deals_confirm" && <PackageCheck size={15} />}
            {flow.actionKey === "deals_accept" && <Check size={15} />}
            {T(flow.actionKey)}
          </button>
          {flow.alt && (
            <button onClick={() => advance(deal.id, flow.alt)}
                    className="tb-btn inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold"
                    style={{ border: `1px solid ${C.LINE}`, color: C.MUTED }}>
              <X size={15} /> {T("deals_decline")}
            </button>
          )}
        </div>
      )}

      {/* пояснение к оплате */}
      {deal.status === "accepted" && (
        <p className="mt-3 text-[11px] leading-relaxed flex gap-2 rounded-lg p-2.5"
           style={{ color: C.MUTED, background: C.PANEL, border: `1px solid ${C.LINE}` }}>
          <Info size={14} className="shrink-0 mt-0.5" /> {T("deals_pay_note")}
        </p>
      )}
    </div>
  );
}

/* Горизонтальная полоса этапов: sent → accepted → paid → delivered. */
function FlowBar({ status, T }) {
  const order = ["requested", "accepted", "paid", "delivered"];
  const declined = status === "declined";
  const idx = declined ? -1 : order.indexOf(status);

  const labels = {
    requested: T("deals_status_requested"),
    accepted:  T("deals_status_accepted"),
    paid:      T("deals_status_paid"),
    delivered: T("deals_status_delivered"),
  };

  if (declined) return null;

  return (
    <div className="mt-4 flex items-center gap-1">
      {order.map((st, i) => {
        const done = i <= idx;
        const isLast = i === order.length - 1;
        return (
          <React.Fragment key={st}>
            <div className="flex flex-col items-center" style={{ minWidth: 0, flex: "0 0 auto" }}>
              <div className="grid place-items-center rounded-full"
                   style={{ width: 22, height: 22, background: done ? C.LEAF : "#fff", border: `1.5px solid ${done ? C.LEAF : C.LINE}` }}>
                {done && <Check size={12} color="#fff" />}
              </div>
            </div>
            {!isLast && (
              <div className="h-0.5 flex-1" style={{ background: i < idx ? C.LEAF : C.LINE, minWidth: 12 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

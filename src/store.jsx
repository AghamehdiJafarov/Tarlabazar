import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/* Хранилище платформы. Всё в localStorage браузера — данные реально сохраняются
   между сессиями, но остаются на устройстве пользователя. Никаких выдуманных
   объявлений или сделок: платформа стартует пустой и наполняется только тем,
   что размещают реальные пользователи. Это честный каркас, а не бутафория. */

const StoreCtx = createContext(null);

const LS_LISTINGS = "tarlabazar_listings_v1";
const LS_DEALS = "tarlabazar_deals_v1";

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function StoreProvider({ children }) {
  const [listings, setListings] = useState(() => load(LS_LISTINGS));
  const [deals, setDeals] = useState(() => load(LS_DEALS));

  useEffect(() => { save(LS_LISTINGS, listings); }, [listings]);
  useEffect(() => { save(LS_DEALS, deals); }, [deals]);

  const addListing = useCallback((listing) => {
    const id = "L" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    const rec = { id, createdAt: Date.now(), status: "active", ...listing };
    setListings((prev) => [rec, ...prev]);
    return id;
  }, []);

  const removeListing = useCallback((id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeals((prev) => prev.filter((d) => d.listingId !== id));
  }, []);

  const getListing = useCallback((id) => listings.find((l) => l.id === id) || null, [listings]);

  const addDeal = useCallback((deal) => {
    const id = "D" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    const rec = { id, createdAt: Date.now(), status: "requested", ...deal };
    setDeals((prev) => [rec, ...prev]);
    return id;
  }, []);

  const updateDealStatus = useCallback((id, status) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }, []);

  const dealsForListing = useCallback((listingId) => deals.filter((d) => d.listingId === listingId), [deals]);

  const clearAll = useCallback(() => {
    setListings([]); setDeals([]);
  }, []);

  return (
    <StoreCtx.Provider value={{
      listings, deals,
      addListing, removeListing, getListing,
      addDeal, updateDealStatus, dealsForListing,
      clearAll,
    }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

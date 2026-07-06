import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./lang.jsx";
import { StoreProvider } from "./store.jsx";
import Landing from "./Landing.jsx";
import Catalog from "./Catalog.jsx";
import NewListing from "./NewListing.jsx";
import Listing from "./Listing.jsx";
import Deals from "./Deals.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/new" element={<NewListing />} />
            <Route path="/listing/:id" element={<Listing />} />
            <Route path="/deals" element={<Deals />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </LangProvider>
  </React.StrictMode>
);

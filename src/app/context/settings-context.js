"use client";

import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [materialCosts, setMaterialCosts] = useState({
    cement: 0,
    sand: 0,
    water: 0,
    putty: 0,
    paint: 0,
    laborCost: 0,
  });

  const updateMaterialCosts = (newCosts) => {
    setMaterialCosts(newCosts);
  };

  return (
    <SettingsContext.Provider value={{ materialCosts, updateMaterialCosts }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

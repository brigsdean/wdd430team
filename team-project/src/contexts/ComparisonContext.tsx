"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CompareItem {
  id: string | number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

interface ComparisonContextType {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: string | number) => void;
  isInCompare: (id: string | number) => boolean;
  clearCompare: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareItem[]>(() => {
    // Initialize from localStorage on first render
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("compareItems");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse compare items from localStorage", e);
        }
      }
    }
    return [];
  });

  // Save to localStorage when items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("compareItems", JSON.stringify(compareItems));
    }
  }, [compareItems]);

  const addToCompare = (item: CompareItem) => {
    setCompareItems((prev) => {
      if (prev.length >= 4) {
        alert("You can only compare up to 4 products at a time");
        return prev;
      }
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: string | number) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id: string | number) => {
    return compareItems.some((item) => item.id === id);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
}

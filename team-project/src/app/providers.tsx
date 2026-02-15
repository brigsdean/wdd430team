"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/CartContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        forcedTheme="dark"
        enableSystem={false}
        storageKey="handcrafted-haven-theme"
      >
        <ComparisonProvider>
          <CartProvider>{children}</CartProvider>
        </ComparisonProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
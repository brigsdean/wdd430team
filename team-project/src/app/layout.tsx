import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description:
    "A marketplace for unique handcrafted items by talented artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-next-root="true">
      <body suppressHydrationWarning className="bg-white dark:bg-gray-900 transition-colors">
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import ComparisonBar from "@/components/ComparisonBar";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <ComparisonBar />
        </Providers>
      </body>
    </html>
  );
}

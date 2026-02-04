import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for unique handcrafted items by talented artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
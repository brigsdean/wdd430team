"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Navigation() {
  const { totalCount } = useCart();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <h1 className="text-xl font-bold text-gray-100">
          Handcrafted Haven
        </h1>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/browse"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Browse
        </Link>
        <Link
          href="/seller"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Sell
        </Link>
        <Link
          href="/returns"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          Returns
        </Link>
        <Link
          href="/about"
          className="text-gray-300 hover:text-amber-400 transition-colors"
        >
          About
        </Link>

        <Link
          href="/cart"
          className="relative text-gray-300 hover:text-amber-400 transition-colors"
        >
          <span className="sr-only">Open cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.586A1 1 0 006.618 17H19" />
          </svg>
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {totalCount}
            </span>
          )}
        </Link>
        <Link
          href="/login"
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

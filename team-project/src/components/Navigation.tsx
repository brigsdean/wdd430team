"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function Navigation() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { totalCount } = useCart();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-amber-600 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
          <span className="text-white font-bold text-lg">H</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
          Handcrafted Haven
        </h1>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/browse"
          className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          Browse
        </Link>
        <Link
          href="/sell"
          className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          Sell
        </Link>
        <Link
          href="/about"
          className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          About
        </Link>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            // Sun icon for light mode
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <Link
          href="/cart"
          className="relative text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
          className="bg-amber-600 dark:bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

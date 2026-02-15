"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeDebugger() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear ALL possible theme keys
      const keys = ['theme', 'handcrafted-haven-theme', '__next_theme__'];
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          console.log(`Found ${key} in localStorage:`, value);
        }
      });

      // Force remove the HTML dark class if it exists
      document.documentElement.classList.remove('dark');
      
      // Force set to light
      console.log('Current localStorage:', localStorage.getItem('handcrafted-haven-theme'));
      localStorage.setItem('handcrafted-haven-theme', 'light');
      setTheme('light');
      
      // Force update the class
      setTimeout(() => {
        if (document.documentElement.classList.contains('dark')) {
          console.log('Dark class still exists, removing...');
          document.documentElement.classList.remove('dark');
        }
      }, 100);
    }
  }, [setTheme]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <h3 className="font-bold mb-2">Theme Debug</h3>
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>System: {systemTheme}</div>
      <div>HTML Class: {typeof window !== 'undefined' && document.documentElement.className}</div>
      <div>Storage: {typeof window !== 'undefined' && localStorage.getItem('handcrafted-haven-theme')}</div>
      <button 
        onClick={() => {
          localStorage.setItem('handcrafted-haven-theme', 'light');
          document.documentElement.classList.remove('dark');
          setTheme('light');
          window.location.reload();
        }}
        className="mt-2 bg-yellow-500 text-black px-2 py-1 rounded mr-2"
      >
        Force Light
      </button>
      <button 
        onClick={() => {
          localStorage.setItem('handcrafted-haven-theme', 'dark');
          document.documentElement.classList.add('dark');
          setTheme('dark');
          window.location.reload();
        }}
        className="mt-2 bg-gray-900 text-white px-2 py-1 rounded"
      >
        Force Dark
      </button>
    </div>
  );
}

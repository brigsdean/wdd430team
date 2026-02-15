"use client";

import { useEffect, useState } from "react";

export default function LocalStorageCleanup() {
  const [cleaned, setCleaned] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !cleaned) {
      // Remove the old theme key
      const oldTheme = localStorage.getItem('theme');
      if (oldTheme) {
        console.log('✓ Removed old theme key:', oldTheme);
        localStorage.removeItem('theme');
        setCleaned(true);
        window.location.reload();
        return;
      }
      
      setCleaned(true);
    }
  }, [cleaned]);

  return null;
}

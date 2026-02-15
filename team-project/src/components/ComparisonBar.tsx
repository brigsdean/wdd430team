"use client";

import { useComparison } from "@/contexts/ComparisonContext";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

export default function ComparisonBar() {
  const { compareItems, removeFromCompare, clearCompare } = useComparison();

  if (compareItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg border-t border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <div className="font-semibold whitespace-nowrap">
              Comparing ({compareItems.length}/4)
            </div>
            <div className="flex gap-2">
              {compareItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-gray-800 rounded px-2 py-1 text-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={32}
                    height={32}
                    className="rounded object-cover"
                  />
                  <span className="max-w-[100px] truncate">{item.title}</span>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="p-1 hover:bg-gray-700 rounded"
                    aria-label={`Remove ${item.title} from comparison`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              Clear All
            </button>
            <Link
              href="/compare"
              className="px-4 py-1.5 text-sm bg-amber-600 hover:bg-amber-700 rounded font-semibold transition-colors"
            >
              Compare Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useComparison } from "@/contexts/ComparisonContext";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";

export default function ComparePage() {
  const { compareItems, clearCompare } = useComparison();

  if (compareItems.length === 0) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors">
              Product Comparison
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">
              You haven&apos;t added any products to compare yet.
            </p>
            <Link
              href="/browse"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
              Compare Products
            </h1>
            <button
              onClick={clearCompare}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto transition-colors">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Feature
                  </th>
                  {compareItems.map((item) => (
                    <th
                      key={item.id}
                      className="p-4 font-semibold text-gray-900 dark:text-gray-100 transition-colors"
                    >
                      <Link href={`/products/${item.id}`}>
                        <div className="flex flex-col items-center gap-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                          />
                          <span className="text-sm">{item.title}</span>
                        </div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Price
                  </td>
                  {compareItems.map((item) => (
                    <td
                      key={item.id}
                      className="p-4 text-center text-amber-600 dark:text-amber-400 font-bold text-xl transition-colors"
                    >
                      ${item.price}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Description
                  </td>
                  {compareItems.map((item) => (
                    <td
                      key={item.id}
                      className="p-4 text-center text-gray-600 dark:text-gray-400 transition-colors"
                    >
                      {item.description}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Category
                  </td>
                  {compareItems.map((item) => (
                    <td
                      key={item.id}
                      className="p-4 text-center text-gray-600 dark:text-gray-400 transition-colors"
                    >
                      {item.category}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Rating
                  </td>
                  {compareItems.map((item) => (
                    <td
                      key={item.id}
                      className="p-4 text-center text-gray-600 dark:text-gray-400 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition-colors">
                    Action
                  </td>
                  {compareItems.map((item) => (
                    <td key={item.id} className="p-4 text-center transition-colors">
                      <Link href={`/products/${item.id}`}>
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                          View Details
                        </button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

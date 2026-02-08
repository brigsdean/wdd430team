"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function BrowsePage() {
  // Mock products - should be fetched from API/DB in a real implementation
  const [products] = useState([
    {
      id: 1,
      title: "Handmade Ceramic Bowl",
      price: 45.99,
      seller: "Clay Master Studio",
      category: "Pottery",
      image: "/images/bowl1.jpg",
      rating: 4.5,
      reviews: 2,
    },
    {
      id: 2,
      title: "Hand-woven Textile Blanket",
      price: 89.99,
      seller: "Textile Arts Co.",
      category: "Textiles",
      image: "/images/blanket1.jpg",
      rating: 4.8,
      reviews: 0,
    },
    {
      id: 3,
      title: "Hand-carved Wooden Spoon",
      price: 18.0,
      seller: "Woodworks Studio",
      category: "Woodwork",
      image: "/images/spoon1.jpg",
      rating: 4.2,
      reviews: 5,
    },
  ]);

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== "All" && p.category !== categoryFilter)
        return false;
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false;
      if (ratingFilter !== "All") {
        const min = Number(ratingFilter) || 0;
        const max = min === 5 ? 5 : min + 0.9;
        if (p.rating < min || p.rating > max) return false;
      }
      return true;
    });
  }, [products, categoryFilter, maxPrice, ratingFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header/Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors">
          Explore{" "}
          <span className="text-amber-600 dark:text-amber-400">
            Handcrafted
          </span>{" "}
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12 transition-colors">
          Discover unique, artisan-made items from talented creators
        </p>

        {/* Filters Section */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice === "" ? "" : String(maxPrice)}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="$500"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors placeholder-gray-400 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors">
                Rating
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 transition-colors"
              >
                <option>All</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                className="w-full bg-amber-600 dark:bg-amber-500 text-white py-2 rounded hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
                onClick={() => {
                  setCategoryFilter("All");
                  setMaxPrice("");
                  setRatingFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all"
            >
              <div className="h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center transition-colors">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2 transition-colors">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors">
                  {product.seller}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 transition-colors">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
                <button className="w-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 py-2 rounded font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

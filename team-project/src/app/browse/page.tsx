'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrowsePage() {
  // Mock products - should be fetched from API/DB in a real implementation
  const [products] = useState([
    {
      id: 1,
      title: 'Handmade Ceramic Bowl',
      price: 45.99,
      seller: 'Clay Master Studio',
      category: 'Pottery',
      image: '/images/bowl1.jpg',
      rating: 4.5,
      reviews: 2,
    },
    {
      id: 2,
      title: 'Hand-woven Textile Blanket',
      price: 89.99,
      seller: 'Textile Arts Co.',
      category: 'Textiles',
      image: '/images/blanket1.jpg',
      rating: 4.8,
      reviews: 0,
    },
    {
      id: 3,
      title: 'Hand-carved Wooden Spoon',
      price: 18.0,
      seller: 'Woodworks Studio',
      category: 'Woodwork',
      image: '/images/spoon1.jpg',
      rating: 4.2,
      reviews: 5,
    },
  ]);

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [ratingFilter, setRatingFilter] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (maxPrice !== '' && p.price > Number(maxPrice)) return false;
      if (ratingFilter !== 'All') {
        const min = Number(ratingFilter) || 0;
           const max = min === 5 ? 5 : min + 0.9;
           if (p.rating < min || p.rating > max) return false;
      }
      return true;
    });
  }, [products, categoryFilter, maxPrice, ratingFilter]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Handcrafted Haven</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/browse" className="text-amber-600 font-semibold">
            Browse
          </Link>
          <Link href="/sell" className="text-gray-600 hover:text-amber-600">
            Sell
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-amber-600">
            About
          </Link>
          <Link
            href="/login"
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Explore <span className="text-amber-600">Handcrafted</span> Products
        </h1>
        <p className="text-gray-600 mb-12">
          Discover unique, artisan-made items from talented creators
        </p>

        {/* Filters Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice === '' ? '' : String(maxPrice)}
                onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="$500"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Rating
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
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
                className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
                onClick={() => {
                  setCategoryFilter('All');
                  setMaxPrice('');
                  setRatingFilter('All');
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
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-64 bg-gray-100 overflow-hidden flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-amber-600 font-semibold mb-2">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.seller}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-amber-600">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
                <button className="w-full bg-amber-100 text-amber-600 py-2 rounded font-semibold hover:bg-amber-200 transition-colors">
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

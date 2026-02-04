import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Handcrafted Haven</h1>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/browse" className="text-gray-600 hover:text-amber-600">
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

      {/* Hero Section */}
      <main className="px-6">
        <section className="max-w-6xl mx-auto py-20 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Discover Unique <span className="text-amber-600">Handcrafted</span>{" "}
            Treasures
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with talented artisans and find one-of-a-kind handmade
            items. Support local creators and discover the beauty of authentic
            craftsmanship.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700"
            >
              Shop Now
            </Link>
            <Link
              href="/sell"
              className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-50"
            >
              Start Selling
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto py-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Handcrafted Haven?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Unique Artisan Work
              </h4>
              <p className="text-gray-600">
                Discover one-of-a-kind pieces crafted with passion and skill by
                talented artisans.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Support Local Creators
              </h4>
              <p className="text-gray-600">
                Directly support independent artists and small businesses in
                your community.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Sustainable Shopping
              </h4>
              <p className="text-gray-600">
                Choose eco-friendly, sustainable products made with care and
                quality materials.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="max-w-6xl mx-auto py-16 bg-gray-50 rounded-2xl mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Popular Categories
          </h3>
          <div className="grid md:grid-cols-6 gap-6 px-8">
            {[
              { name: "Jewelry", emoji: "💍" },
              { name: "Home Decor", emoji: "🏠" },
              { name: "Clothing", emoji: "👕" },
              { name: "Pottery", emoji: "🏺" },
              { name: "Woodwork", emoji: "🪵" },
              { name: "Textiles", emoji: "🧶" },
            ].map((category) => (
              <div
                key={category.name}
                className="text-center p-4 bg-white rounded-lg hover:shadow-md cursor-pointer"
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <p className="font-medium text-gray-800">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto py-16 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of creators and conscious consumers today.
          </p>
          <Link
            href="/register"
            className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700"
          >
            Get Started
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">Handcrafted Haven</span>
              </div>
              <p className="text-gray-400">
                Supporting artisans and conscious consumers worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse All
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:text-white">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Sell</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/sell" className="hover:text-white">
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link href="/seller-guide" className="hover:text-white">
                    Seller Guide
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 Handcrafted Haven. Built by{" "}
              {/* Your team names here */} Johnathan Babb, Briggs Dean, Fabian
              Ricardo Betancourt.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

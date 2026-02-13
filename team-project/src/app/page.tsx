import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation Header */}
      <Navigation />

      {/* Hero Section */}
      <main className="px-6">
        <section className="max-w-6xl mx-auto py-20 text-center">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors">
            Discover Unique{" "}
            <span className="text-amber-600 dark:text-amber-400">
              Handcrafted
            </span>{" "}
            Treasures
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors">
            Connect with talented artisans and find one-of-a-kind handmade
            items. Support local creators and discover the beauty of authentic
            craftsmanship.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-amber-600 dark:bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/seller"
              className="border-2 border-amber-600 dark:border-amber-400 text-amber-600 dark:text-amber-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto py-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 transition-colors">
            Why Choose Handcrafted Haven?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 transition-colors">
                Unique Artisan Work
              </h4>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">
                Discover one-of-a-kind pieces crafted with passion and skill by
                talented artisans.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 transition-colors">
                Support Local Creators
              </h4>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">
                Directly support independent artists and small businesses in
                your community.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <span className="text-2xl">♻️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 transition-colors">
                Sustainable Shopping
              </h4>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">
                Choose eco-friendly, sustainable products made with care and
                quality materials.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="max-w-6xl mx-auto py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-16 transition-colors">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 transition-colors">
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
                className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md cursor-pointer transition-colors"
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <p className="font-medium text-gray-800 dark:text-gray-100 transition-colors">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto py-16 text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors">
            Join our community of creators and conscious consumers today.
          </p>
          <Link
            href="/register"
            className="bg-amber-600 dark:bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
          >
            Get Started
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-600 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">Handcrafted Haven</span>
              </div>
              <p className="text-gray-400 dark:text-gray-300">
                Supporting artisans and conscious consumers worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link
                    href="/browse"
                    className="hover:text-white transition-colors"
                  >
                    Browse All
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new"
                    className="hover:text-white transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Sell</h5>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link
                    href="/seller"
                    className="hover:text-white transition-colors"
                  >
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller-guide"
                    className="hover:text-white transition-colors"
                  >
                    Seller Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-8 text-center text-gray-400 dark:text-gray-300 transition-colors">
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

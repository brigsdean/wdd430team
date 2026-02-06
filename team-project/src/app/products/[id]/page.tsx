import ProductDetail from '@/components/ProductDetail';
import Link from 'next/link';

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id);

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

      {/* Product Detail Component */}
      <ProductDetail productId={productId} />
    </div>
  );
}

import ProductDetail from "@/components/ProductDetail";
import Navigation from "@/components/Navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header/Navigation */}
      <Navigation />

      {/* Product Detail Component */}
      <ProductDetail productId={productId} />
    </div>
  );
}

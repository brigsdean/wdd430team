import ProductDetail from "@/components/ProductDetail";
import Navigation from "@/components/Navigation";

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const productId = parseInt(id);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header/Navigation */}
      <Navigation />

      {/* Product Detail Component */}
      <ProductDetail productId={productId} />
    </div>
  );
}

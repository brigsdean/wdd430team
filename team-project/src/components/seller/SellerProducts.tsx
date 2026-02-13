"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit2, Trash2, Star } from "lucide-react";
import { deleteProduct } from "@/app/lib/products/actions";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
}

interface SellerProductsProps {
  products: Product[];
  onProductDeleted?: (productId: number) => void;
  isOwnProfile: boolean;
}

export default function SellerProducts({ 
  products, 
  onProductDeleted,
  isOwnProfile 
}: SellerProductsProps) {
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setDeleteLoading(productId);
    try {
      const result = await deleteProduct(productId);
      if (result.success) {
        onProductDeleted?.(productId);
        alert("Product deleted successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error deleting product");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          {isOwnProfile 
            ? "You don't have any published products yet" 
            : "This seller has no published products"}
        </p>
        {isOwnProfile && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Start sharing your creations today!
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Products ({products.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
          >
            {/* Product image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}

              {isOwnProfile && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    title="Edit product"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteLoading === product.id}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
                {product.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Category */}
              <div className="mb-3">
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating.toFixed(1)} ({product.reviews} {product.reviews === 1 ? "review" : "reviews"})
                </span>
              </div>

              {/* Price */}
              <div className="border-t dark:border-gray-700 pt-3">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Details button */}
              <button className="w-full mt-4 bg-amber-600 dark:bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

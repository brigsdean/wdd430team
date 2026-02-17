"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  seller: string;
  category: string;
  description: string;
  materials: string;
  dimensions: string;
  weight: string;
  images: string[];
  rating: number;
  reviews: Review[];
}

export default function ProductDetail({ productId }: { productId: number }) {
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, session]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setReviewMessage({ type: "error", text: "Please log in to leave a review" });
      return;
    }

    if (rating === 0) {
      setReviewMessage({ type: "error", text: "Please select a rating" });
      return;
    }

    setSubmitting(true);
    setReviewMessage(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setReviewMessage({ type: "success", text: data.message });
      setRating(0);
      setComment("");
      
      // Refresh product data to show new review
      const productResponse = await fetch(`/api/products/${productId}`);
      if (productResponse.ok) {
        const productData = await productResponse.json();
        setProduct(productData);
      }
    } catch (err) {
      setReviewMessage({ 
        type: "error", 
        text: err instanceof Error ? err.message : "Failed to submit review" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-300 transition-colors">
          Loading product...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors">
            {error || "Product not found"}
          </h2>
          <Link
            href="/browse"
            className="bg-amber-600 dark:bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
          >
            Back to browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/browse"
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            ← Back to products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center transition-colors">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 dark:text-gray-500 transition-colors">
                  No image available
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden transition-colors ${
                      selectedImage === index
                        ? "border-amber-600 dark:border-amber-400"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-semibold mb-3 transition-colors">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-500 text-lg">★</div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors">
                  {product.rating}
                </span>
                <span className="text-gray-600 dark:text-gray-300 transition-colors">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
              <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2 transition-colors">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-green-600 dark:text-green-400 font-semibold transition-colors">
                In stock
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors">
                Description
              </h3>

          {/* Review Form */}
          <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors">
              Write a review
            </h3>
            
            {!session ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-300 mb-3 transition-colors">
                  Please log in to leave a review
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Log in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                {/* Rating Stars */}
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-3xl transition-colors focus:outline-none"
                      >
                        <span
                          className={
                            star <= (hoverRating || rating)
                              ? "text-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors">
                    Your review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="Share your experience with this product..."
                  />
                </div>

                {/* Message */}
                {reviewMessage && (
                  <div
                    className={`mb-4 p-3 rounded-lg ${
                      reviewMessage.type === "success"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    } transition-colors`}
                  >
                    {reviewMessage.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit review"}
                </button>
              </form>
            )}
          </div>

          {/* Existing Reviews */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                {product.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700/50 transition-colors">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 transition-colors">
                Verified seller
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors">
                {product.seller}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-amber-600 dark:bg-amber-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors">
              Add to cart
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700 transition-colors">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-lg transition-colors">
              Materials
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              {product.materials}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-lg transition-colors">
              Dimensions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              {product.dimensions}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-lg transition-colors">
              Weight
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              {product.weight}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors">
            Customer reviews
          </h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800 dark:text-gray-100 transition-colors">
                      {review.user}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-500 text-lg"
                            : "text-gray-300 dark:text-gray-600 text-lg transition-colors"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

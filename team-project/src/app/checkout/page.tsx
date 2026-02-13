"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  if (!session) return null;

  const handlePlaceOrder = () => {
    // Minimal placeholder: in real app send to backend/payment gateway
    clearCart();
    router.push("/");
    alert("Order placed - thank you!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="flex items-center justify-between">
                <div className="text-gray-700 dark:text-gray-200">Items total</div>
                <div className="font-bold text-amber-600 dark:text-amber-400">${totalPrice.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-amber-600 text-white py-2 rounded font-semibold">Place Order</button>
          </div>
        )}
      </main>
    </div>
  );
}

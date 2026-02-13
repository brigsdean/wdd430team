"use client";

import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, clearCart, totalCount, totalPrice, updateQuantity } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {it.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-100">{it.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">${it.price.toFixed(2)} each</div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded text-lg flex items-center justify-center"
                        aria-label={`Decrease quantity of ${it.title}`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) => updateQuantity(it.id, Math.max(1, Number(e.target.value) || 1))}
                        className="w-16 text-center border rounded px-2 py-1 bg-white dark:bg-gray-900"
                      />
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded text-lg flex items-center justify-center"
                        aria-label={`Increase quantity of ${it.title}`}
                      >
                        +
                      </button>
                      <button onClick={() => removeItem(it.id)} className="ml-4 text-sm text-red-600">Remove</button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-amber-600 dark:text-amber-400">${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="p-4 bg-gray-50 dark:bg-gray-900 rounded h-fit">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Items</span>
                  <span>{totalCount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-4">
                <button onClick={handleCheckout} className="w-full bg-amber-600 text-white py-2 rounded font-semibold">Proceed to Checkout</button>
              </div>

              <button onClick={() => clearCart()} className="mt-3 w-full border border-red-600 text-red-600 py-2 rounded">Clear cart</button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

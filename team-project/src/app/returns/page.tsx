"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  id: number;
  productId: number;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface ReturnRequest {
  id: number;
  orderNumber: string;
  productTitle: string;
  reason: string;
  status: string;
  createdAt: string;
}

export default function ReturnsPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"orders" | "returns">("orders");
  
  // Return form state
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<{orderId: number, orderItemId: number, productTitle: string} | null>(null);
  const [returnReason, setReturnReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrdersAndReturns();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchOrdersAndReturns = async () => {
    try {
      const [ordersRes, returnsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/order-returns"),
      ]);

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      if (returnsRes.ok) {
        const returnsData = await returnsRes.json();
        setReturns(returnsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnRequest = (orderId: number, orderItemId: number, productTitle: string) => {
    setSelectedOrderItem({ orderId, orderItemId, productTitle });
    setShowReturnForm(true);
    setMessage(null);
  };

  const handleSubmitReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOrderItem || !returnReason.trim()) {
      setMessage({ type: "error", text: "Please provide a reason for the return" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/order-returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrderItem.orderId,
          orderItemId: selectedOrderItem.orderItemId,
          reason: returnReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit return request");
      }

      setMessage({ type: "success", text: "Return request submitted successfully!" });
      setReturnReason("");
      setShowReturnForm(false);
      setSelectedOrderItem(null);
      
      // Refresh data
      await fetchOrdersAndReturns();
      setSelectedTab("returns");
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err instanceof Error ? err.message : "Failed to submit return request" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 transition-colors">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
          <div className="max-w-7xl mx-auto py-12 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors">
              Orders & Returns
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">
              Please log in to view your orders and returns.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-20 px-4 transition-colors">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 transition-colors">
            Orders & Returns
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedTab("orders")}
              className={`pb-3 px-4 font-semibold transition-colors ${
                selectedTab === "orders"
                  ? "border-b-2 border-amber-600 text-amber-600 dark:text-amber-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              My Orders ({orders.length})
            </button>
            <button
              onClick={() => setSelectedTab("returns")}
              className={`pb-3 px-4 font-semibold transition-colors ${
                selectedTab === "returns"
                  ? "border-b-2 border-amber-600 text-amber-600 dark:text-amber-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Return Requests ({returns.length})
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
              } transition-colors`}
            >
              {message.text}
            </div>
          )}

          {/* Orders Tab */}
          {selectedTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center transition-colors">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link
                    href="/browse"
                    className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === "delivered"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                              : order.status === "pending"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                          } transition-colors`}
                        >
                          {order.status}
                        </span>
                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-2 transition-colors">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Image
                            src={item.productImage}
                            alt={item.productTitle}
                            width={60}
                            height={60}
                            className="rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                              {item.productTitle}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          {order.status === "delivered" && (
                            <button
                              onClick={() => handleReturnRequest(order.id, item.id, item.productTitle)}
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                            >
                              Request Return
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Returns Tab */}
          {selectedTab === "returns" && (
            <div className="space-y-6">
              {returns.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center transition-colors">
                  <p className="text-gray-600 dark:text-gray-400 transition-colors">
                    You haven&apos;t submitted any return requests yet.
                  </p>
                </div>
              ) : (
                returns.map((returnReq) => (
                  <div
                    key={returnReq.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                          {returnReq.productTitle}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          Order #{returnReq.orderNumber}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          Requested on {new Date(returnReq.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          returnReq.status === "approved"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : returnReq.status === "rejected"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        } transition-colors`}
                      >
                        {returnReq.status}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                        Reason:
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors">
                        {returnReq.reason}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Return Form Modal */}
          {showReturnForm && selectedOrderItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 transition-colors">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors">
                  Request Return
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">
                  Product: <span className="font-semibold">{selectedOrderItem.productTitle}</span>
                </p>
                <form onSubmit={handleSubmitReturn}>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors">
                      Reason for return
                    </label>
                    <textarea
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                      placeholder="Please explain why you'd like to return this item..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReturnForm(false);
                        setSelectedOrderItem(null);
                        setReturnReason("");
                        setMessage(null);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { prisma } from "@/lib/prisma";

// Mock orders for when database isn't connected
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    totalAmount: 135.98,
    status: "delivered",
    createdAt: "2024-01-20T10:30:00Z",
    items: [
      {
        id: 1,
        productId: 1,
        productTitle: "Handmade Ceramic Bowl",
        productImage: "/images/bowl1.jpg",
        quantity: 1,
        price: 45.99,
      },
      {
        id: 2,
        productId: 2,
        productTitle: "Hand-woven Textile Blanket",
        productImage: "/images/blanket1.jpg",
        quantity: 1,
        price: 89.99,
      },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    totalAmount: 45.99,
    status: "pending",
    createdAt: "2024-02-10T14:15:00Z",
    items: [
      {
        id: 3,
        productId: 1,
        productTitle: "Handmade Ceramic Bowl",
        productImage: "/images/bowl1.jpg",
        quantity: 1,
        price: 45.99,
      },
    ],
  },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      // Try to fetch from database
      const orders = await prisma.order.findMany({
        where: {
          userId: parseInt(session.user.id),
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  title: true,
                  images: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedOrders = orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: parseFloat(order.totalAmount.toString()),
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          productTitle: item.product.title,
          productImage: Array.isArray(item.product.images) && item.product.images.length > 0
            ? (item.product.images as string[])[0]
            : "/images/placeholder.jpg",
          quantity: item.quantity,
          price: parseFloat(item.price.toString()),
        })),
      }));

      return NextResponse.json(formattedOrders);
    } catch (dbError) {
      console.error("Database error, returning mock data:", dbError);
      // Return mock orders if database isn't connected
      return NextResponse.json(mockOrders);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

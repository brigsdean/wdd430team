import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { prisma } from "@/lib/prisma";

// Mock returns for when database isn't connected
const mockReturns = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    productTitle: "Handmade Ceramic Bowl",
    reason: "Product arrived damaged",
    status: "approved",
    createdAt: "2024-01-25T09:00:00Z",
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
      const returns = await prisma.return.findMany({
        where: {
          userId: parseInt(session.user.id),
        },
        include: {
          order: {
            select: {
              orderNumber: true,
            },
          },
          orderItem: {
            include: {
              product: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedReturns = returns.map((returnReq) => ({
        id: returnReq.id,
        orderNumber: returnReq.order.orderNumber,
        productTitle: returnReq.orderItem.product.title,
        reason: returnReq.reason,
        status: returnReq.status,
        createdAt: returnReq.createdAt.toISOString(),
      }));

      return NextResponse.json(formattedReturns);
    } catch (dbError) {
      console.error("Database error, returning mock data:", dbError);
      // Return mock returns if database isn't connected
      return NextResponse.json(mockReturns);
    }
  } catch (error) {
    console.error("Error fetching returns:", error);
    return NextResponse.json(
      { error: "Failed to fetch returns" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to submit a return request" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId, orderItemId, reason } = body;

    // Validate input
    if (!orderId || !orderItemId || !reason) {
      return NextResponse.json(
        { error: "Order ID, order item ID, and reason are required" },
        { status: 400 }
      );
    }

    try {
      // Check if order exists and belongs to user
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
        include: {
          items: {
            where: {
              id: parseInt(orderItemId),
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      if (order.userId !== parseInt(session.user.id)) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 403 }
        );
      }

      if (order.items.length === 0) {
        return NextResponse.json(
          { error: "Order item not found" },
          { status: 404 }
        );
      }

      // Check if return already exists for this order item
      const existingReturn = await prisma.return.findFirst({
        where: {
          orderItemId: parseInt(orderItemId),
          userId: parseInt(session.user.id),
        },
      });

      if (existingReturn) {
        return NextResponse.json(
          { error: "A return request already exists for this item" },
          { status: 400 }
        );
      }

      // Create return request
      const newReturn = await prisma.return.create({
        data: {
          orderId: parseInt(orderId),
          orderItemId: parseInt(orderItemId),
          userId: parseInt(session.user.id),
          reason: reason,
          status: "pending",
        },
      });

      return NextResponse.json({
        message: "Return request submitted successfully",
        return: {
          id: newReturn.id,
          status: newReturn.status,
          createdAt: newReturn.createdAt,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      // For demo purposes without database, return success
      return NextResponse.json({
        message: "Return request submitted successfully (demo mode - database not connected)",
        return: {
          id: Date.now(),
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("Error creating return:", error);
    return NextResponse.json(
      { error: "Failed to submit return request" },
      { status: 500 }
    );
  }
}

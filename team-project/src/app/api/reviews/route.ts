import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to leave a review" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, rating, comment } = body;

    // Validate input
    if (!productId || !rating) {
      return NextResponse.json(
        { error: "Product ID and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId: parseInt(productId),
          userId: parseInt(session.user.id),
        },
      },
    });

    if (existingReview) {
      // Update existing review
      const updatedReview = await prisma.review.update({
        where: {
          id: existingReview.id,
        },
        data: {
          rating: parseInt(rating),
          comment: comment || null,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return NextResponse.json({
        message: "Review updated successfully",
        review: {
          id: updatedReview.id,
          rating: updatedReview.rating,
          comment: updatedReview.comment,
          createdAt: updatedReview.createdAt,
          user: `${updatedReview.user.firstName} ${updatedReview.user.lastName}`,
        },
      });
    } else {
      // Create new review
      const newReview = await prisma.review.create({
        data: {
          productId: parseInt(productId),
          userId: parseInt(session.user.id),
          rating: parseInt(rating),
          comment: comment || null,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return NextResponse.json({
        message: "Review created successfully",
        review: {
          id: newReview.id,
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: newReview.createdAt,
          user: `${newReview.user.firstName} ${newReview.user.lastName}`,
        },
      });
    }
  } catch (error) {
    console.error("Error creating/updating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

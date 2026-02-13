"use server";

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  materials: string;
  dimensions: string;
  weight: string;
  images: string[];
};

export type ActionResult = {
  success: boolean;
  message: string;
  productId?: number;
  errors?: Record<string, string[]>;
};

// Placeholder implementation - replace with real database logic
export async function createProduct(
  sellerId: string,
  data: ProductInput
): Promise<ActionResult> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _payload = { sellerId, ...data };
  
  // TODO: Implement real database creation
  // This will be connected to the database once authentication is set up
  return {
    success: true,
    message: "Product created successfully (mock)",
    productId: Math.floor(Math.random() * 10000),
  };
}

export async function updateProduct(
  productId: number,
  data: Partial<ProductInput>
): Promise<ActionResult> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _payload = { productId, ...data };
  
  // TODO: Implement real database update
  return {
    success: true,
    message: "Product updated successfully (mock)",
  };
}

export async function deleteProduct(productId: number): Promise<ActionResult> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _payload = { productId };
  
  // TODO: Implement real database deletion
  return {
    success: true,
    message: "Product deleted successfully (mock)",
  };
}

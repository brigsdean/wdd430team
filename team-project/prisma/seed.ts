import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create test users
  const testPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      passwordHash: testPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '555-0101',
      address: '123 Main St, Anytown, USA',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      passwordHash: testPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '555-0102',
      address: '456 Oak Ave, Somewhere, USA',
    },
  });

  console.log('Created users:', { user1, user2 });

  // Create test sellers
  const seller1 = await prisma.seller.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      businessName: 'Clay Master Studio',
      bio: 'Creating beautiful handcrafted ceramics for over 10 years',
      website: 'https://claymasterstudio.com',
      isVerified: true,
    },
  });

  const seller2 = await prisma.seller.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      businessName: 'Textile Arts Co.',
      bio: 'Hand-woven textiles using traditional techniques',
      website: 'https://textileartsco.com',
      isVerified: true,
    },
  });

  console.log('Created sellers:', { seller1, seller2 });

  // Create categories
  const pottery = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Pottery',
      description: 'Handmade ceramic items',
    },
  });

  const textiles = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Textiles',
      description: 'Hand-woven fabrics and textiles',
    },
  });

  const woodwork = await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Woodwork',
      description: 'Hand-carved wooden items',
    },
  });

  console.log('Created categories:', { pottery, textiles, woodwork });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      sellerId: seller1.id,
      categoryId: pottery.id,
      title: 'Handmade Ceramic Bowl',
      description: 'Beautiful handcrafted ceramic bowl perfect for serving or decoration. Each piece is unique and made with care.',
      price: 45.99,
      stockQuantity: 10,
      images: ['/images/bowl1.jpg', '/images/bowl2.jpg'],
      materials: 'Ceramic, food-safe glaze',
      dimensions: '8 inches diameter, 4 inches height',
      weight: '2 lbs',
      isActive: true,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      sellerId: seller2.id,
      categoryId: textiles.id,
      title: 'Hand-woven Textile Blanket',
      description: 'Cozy hand-woven blanket made with natural fibers. Perfect for your living room or bedroom.',
      price: 89.99,
      stockQuantity: 5,
      images: ['/images/blanket1.jpg'],
      materials: '100% organic cotton, natural dyes',
      dimensions: '60 x 80 inches',
      weight: '3.5 lbs',
      isActive: true,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      sellerId: seller1.id,
      categoryId: woodwork.id,
      title: 'Hand-carved Wooden Spoon',
      description: 'Elegant hand-carved wooden spoon, perfect for cooking or serving.',
      price: 18.0,
      stockQuantity: 20,
      images: ['/images/spoon1.jpg'],
      materials: 'Cherry wood, food-safe oil finish',
      dimensions: '12 inches length',
      weight: '0.3 lbs',
      isActive: true,
    },
  });

  console.log('Created products:', { product1, product2, product3 });

  // Create some reviews
  await prisma.review.create({
    data: {
      productId: product1.id,
      userId: user2.id,
      rating: 5,
      comment: 'Amazing quality! Perfect gift.',
    },
  });

  await prisma.review.create({
    data: {
      productId: product3.id,
      userId: user2.id,
      rating: 4,
      comment: 'Beautiful craftsmanship. Very pleased with this purchase.',
    },
  });

  console.log('Created reviews');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

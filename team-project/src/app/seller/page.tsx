import Navigation from "@/components/Navigation";
import SellerProfile from "@/components/seller/SellerProfile";
import SellerProducts from "@/components/seller/SellerProducts";
import ProductForm from "@/components/seller/ProductForm";

// Mock data - will be replaced with real data from database
const mockSeller = {
  id: "seller-1",
  name: "Clay Master Studio",
  bio: "Artisan ceramicist with 10+ years of experience creating beautiful handcrafted pottery. Specializing in functional and decorative pieces inspired by traditional techniques and modern design.",
  email: "contact@claymasterstudio.com",
  location: "Portland, Oregon",
  profileImage: "/images/seller-profile.jpg",
  joinDate: "2022-03-15",
  followers: 124,
};

const mockProducts = [
  {
    id: 1,
    title: "Handmade Ceramic Bowl",
    price: 45.99,
    category: "Pottery",
    description: "Beautiful handcrafted ceramic bowl perfect for serving or decoration.",
    images: ["/images/bowl1.jpg"],
    rating: 4.5,
    reviews: 2,
  },
  {
    id: 2,
    title: "Hand-woven Textile Blanket",
    price: 89.99,
    category: "Textiles",
    description: "Cozy hand-woven blanket made with natural fibers.",
    images: ["/images/blanket1.jpg"],
    rating: 4.8,
    reviews: 0,
  },
  {
    id: 3,
    title: "Hand-carved Wooden Spoon",
    price: 18.0,
    category: "Woodwork",
    description: "Beautifully hand-carved wooden serving spoon with smooth finish.",
    images: ["/images/spoon1.jpg"],
    rating: 4.2,
    reviews: 5,
  },
];

interface SellerProfilePageProps {
  params: Promise<{ id?: string }>;
}

export default async function SellerProfilePage({
  params,
}: SellerProfilePageProps) {
  const { id } = await params;
  
  // TODO: Fetch real seller data from database based on id
  // For now, using mock data
  const isOwnProfile = !id || id === "own"; // Placeholder - will use actual auth
  const seller = mockSeller;
  const products = mockProducts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Seller Profile Section */}
        <SellerProfile
          seller={seller}
          isOwnProfile={isOwnProfile}
        />

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Products
            </h2>
            {isOwnProfile && (
              <ProductForm
                sellerId={seller.id}
              />
            )}
          </div>

          <SellerProducts
            products={products}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
    </div>
  );
}

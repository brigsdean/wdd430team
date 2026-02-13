"use client";

import Image from "next/image";
import { Mail, MapPin, Heart, X } from "lucide-react";
import { useState } from "react";

interface SellerProfileProps {
  seller: {
    id: string;
    name: string;
    bio: string;
    email: string;
    location?: string;
    profileImage?: string;
    joinDate: string;
    followers: number;
  };
  isOwnProfile: boolean;
}

export default function SellerProfile({
  seller,
  isOwnProfile,
}: SellerProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: seller.name,
    bio: seller.bio,
    location: seller.location || "",
    email: seller.email,
  });

  const joinYear = new Date(seller.joinDate).getFullYear();
  const joinMonth = new Date(seller.joinDate).toLocaleDateString("es-ES", {
    month: "long",
  });

  const handleEditChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    // TODO: Save profile changes to database
    console.log("Saving profile:", editData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen del perfil */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-32 h-32 mb-4">
            {seller.profileImage ? (
              <Image
                src={seller.profileImage}
                alt={seller.name}
                fill
                className="rounded-full object-cover border-4 border-amber-600 dark:border-amber-500"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {seller.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          {isOwnProfile && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Información del vendedor */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {seller.name}
          </h1>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            {seller.location && (
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-amber-600 dark:text-amber-400" />
                <span>{seller.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-amber-600 dark:text-amber-400" />
              <span>{seller.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-amber-600 dark:text-amber-400" />
              <span>{seller.followers} {seller.followers === 1 ? "follower" : "followers"}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-base leading-relaxed">
            {seller.bio || "This seller hasn't completed their bio yet."}
          </p>

          {/* Join date */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Joined {joinMonth} {joinYear}
          </div>
        </div>

        {/* Estadísticas (lado derecho en desktop) */}
        <div className="flex justify-center gap-8 md:flex-col md:justify-start md:gap-6 md:border-l dark:md:border-gray-700 md:pl-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {seller.followers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {seller.followers === 1 ? "Follower" : "Followers"}
            </div>
          </div>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-amber-600 dark:bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors font-medium">
            Follow
          </button>
          <button className="flex-1 border-2 border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 px-6 py-2 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors font-medium">
            Contact
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleEditChange("location", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="E.g: Portland, Oregon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Biography
                </label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleEditChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about your business and craftsmanship..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t dark:border-gray-700">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-amber-600 dark:bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Navigation from "@/components/Navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navigation />
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            Log in to your Handcrafted Haven account
          </p>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}

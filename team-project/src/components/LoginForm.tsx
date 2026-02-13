"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/lib/users/actions";
import Link from "next/link";

export default function LoginForm() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // form validation on the client side
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        if (!password) {
            setError("Password is required.");
            setLoading(false);
            return;
        }

        try {
            // this is going to the loginUser function in lib/actions.ts
            const result = await loginUser(email, password);

            if (result.success) {
                router.push("/");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
            <h1 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">Sign In</h1>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="you@example.com"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    required 
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded text-sm">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 dark:bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 dark:hover:bg-amber-600 disabled:opacity-50 transition-colors"
                aria-label="Sign in to your account."
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Link to Create Account */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/create-account" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                    Create one
                </Link>
            </div>
        </form>
    )
}
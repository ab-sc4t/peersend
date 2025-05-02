"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        const form = event.currentTarget;
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await signIn("credentials", { username, password, redirect: false });

            if (response?.error) {
                console.log(error);
                setError("Invalid credentials.");
            } else if (response?.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#121212]">
            <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-lg border border-[#2d2d2d] shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            required
                            placeholder="abayush"
                            className="mt-1 block w-full px-4 py-3 bg-[#2d2d2d] border border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-3 bg-[#2d2d2d] border border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
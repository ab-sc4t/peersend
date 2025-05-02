"use client"
import MnemonicModal from "@/components/MnemonicModal";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Signup() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [publicKey, setPublicKey] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: e.target.username.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            const res = await axios.post("/api/user",
                { formData },
                { headers: { "Content-Type": "application/json" } }
            );
            const data = await res.data;
            if (res.status === 201) {
                localStorage.setItem(`privKey-${data.username}`, data.privateKey);
                setMnemonic(data.mnemonic); // show mnemonic
                setPublicKey(data.publicKey);
                setShowModal(true);
            } else {
                throw new Error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup: ", error);
            setError("Signup failed. Please check your details and try again.");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#121212]">
            <div className="w-full max-w-md bg-[#1e1e1e] p-6 mt-18 rounded-lg border border-[#2d2d2d] shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>
                {error && (
                    <div className="mb-2 p-2 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-1">
                    {['username', 'firstname', 'lastname', 'email', 'password'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                required
                                placeholder={field === 'email' ? 'admin@example.com' : `Enter your ${field}`}
                                className="w-full px-4 py-3 bg-[#2d2d2d] border border-[#3d3d3d] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400 mt-6">
                    Already a registered user?{" "}
                    <a href="/signin" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                        Sign in
                    </a>
                </p>
            </div>
            <MnemonicModal
                mnemonic={mnemonic}
                publicKey={publicKey}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

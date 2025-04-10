"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function MnemonicModal({ mnemonic, isOpen, onClose }) {
    const router = useRouter();
    const words = mnemonic.split(" ");

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose(); // close modal
        router.push("/signin"); // redirect to signin
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}>
            <div className="text-black bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Your Recovery Phrase</h2>
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {words.map((word, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 text-center py-2 rounded-md font-medium text-sm"
                        >
                            {index + 1}. {word}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MnemonicModal({ mnemonic, publicKey, isOpen, onClose }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const words = mnemonic.split(" ");

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        router.push("/signin");
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
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

                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold">Public Key:</h3>
                        <button
                            onClick={handleCopy}
                            className="text-xs text-black-600 hover:underline"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <p className="text-xs break-words bg-gray-100 p-2 rounded-md">{publicKey}</p>
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

"use client";

import React from "react";

export default function ExtractedMnemonic({publicKey, isOpen, onClose }) {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch((err) => {
            console.error("Failed to copy: ", err);
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl">
                <h2 className="text-2xl font-semibold mb-4 text-center text-black">
                    Your Keys Are Ready
                </h2>
                <div className="mb-6">
                    <h3 className="text-md font-medium mb-1 text-black">Public Key</h3>
                    <div className="bg-gray-100 rounded-md p-3 text-sm text-black break-all">
                        {publicKey}
                    </div>
                    <button
                        onClick={() => handleCopy(publicKey)}
                        className="mt-2 text-sm text-black  hover:underline"
                    >
                        Copy Public Key
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

"use client";

import axios from "axios";
import { useState } from "react";
import ExtractedMnemonic from "./ExtractedMnemonic";

export default function ExtractPrivKeyClient({ session }) {
    const [showModal, setShowModal] = useState(false);
    const [publicKey, setPublicKey] = useState("");
    const username = session?.user?.username || "unknown"
    if (username == "unknown") {
        return (
            <div>
                You need to login to Extract Private Key
            </div>
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const password = formData.get("password");
        const mnemonicWords = Array.from({ length: 12 }, (_, i) => formData.get(`word-${i}`)).join(" ");

        const mnemonicData = {
            username,
            password,
            mnemonic: mnemonicWords,
        };
        console.log(mnemonicWords);

        try {
            const res = await axios.post("/api/user/extract", mnemonicData); // POST not GET for sending body
            if (res.status === 200) {
                const data = res.data;
                localStorage.setItem(`privKey-${data.username}`, data.privateKey);
                console.log(data);
                setPublicKey(data.publicKey);
                setShowModal(true);
            } else {
                console.log("Error:", res.data.message);
            }
        } catch (err) {
            console.error("Request error:", err);
        }
    };

    return (
        <div
            className="p-20 h-screen bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Extract Private Key</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mnemonic
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={`word-${index}`}
                                    required
                                    placeholder={`Word ${index + 1}`}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 w-full"
                    >
                        Extract Private Key
                    </button>
                </form>
            </div>
            <ExtractedMnemonic
                publicKey={publicKey}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

"use client"

import axios from "axios";
import { useState } from "react";

export default function MessageDetail({ message, onClose }) {
    const [decrypted, setDecrypted] = useState("");

    const handleDecrypt = async (id) => {
        try {
            const res = await axios.get(`/api/message/decrypt?id=${id}`);
            if (res.status === 200) {
                setDecrypted(res.data.decryptedMessage.message);
            } else {
                console.warn("Decryption request failed:", res.status);
            }
        } catch (error) {
            console.error("Error decrypting the message:", error);
        }
    };

    return (
        <div className="relative w-full max-w-full mt-2 p-4 bg-gray-800/40 text-white rounded-md shadow border border-white/10 overflow-hidden break-words"> 
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1 w-full">
                    <div><strong>From:</strong> {message.sender}</div>
                    <div><strong>Subject:</strong> {message.subject}</div>

                    <div className="mt-2">
                        <strong>Encrypted:</strong>
                        <div className="text-pink-400 text-sm break-words whitespace-pre-wrap w-full overflow-hidden">
                            {message.encryptedMessage}
                        </div>
                    </div>

                    <div className="mt-2">
                        <strong>Decrypted:</strong>
                        <div className="text-green-400 text-sm break-words whitespace-pre-wrap w-full overflow-hidden">
                            {decrypted === "" ? "Click on the Decrypt message." : decrypted}
                        </div>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded ml-4"
                >
                    Close
                </button>
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <button className="rounded-3xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-black h-10">
                    Verify
                </button>
                <button
                    onClick={() => handleDecrypt(message.id)}
                    className="rounded-3xl bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-black h-10"
                >
                    Decrypt
                </button>
            </div>
        </div>
    );
}

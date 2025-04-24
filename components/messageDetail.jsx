"use client"

import axios from "axios";
import { useState } from "react";

export default function MessageDetail({ message, onClose, session }) {
    const [decrypted, setDecrypted] = useState("");
    const [senPubKey, setSenPubKey] = useState("");
    const [verified, setVerified] = useState(false); 
    const [error, setError] = useState("");
    const username = session.user.username;
    const recPrivKey = localStorage.getItem(`privKey-${username}`);

    const handleVerify = async (id) => {
        try {
            const data = {
                id,
                senPubKey,
            };
            const res = await axios.post(`/api/message/verify`, {
                data
            });
            if (res.status === 200) {
                setVerified(true); 
                alert("The message is verified and not tampered with.");
            } else if (res.status === 202) {
                setVerified(false);
                setError("The message is not verified and is tampered.");
            } else {
                console.warn("Verification request failed:", res.status);
                setVerified(false);
                setError("Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            setVerified(false);
            setError("Error during verification. Please try again.");
        }
    };

    const handleDecrypt = async (id) => {
        if (!verified) {
            alert("Please verify the message before decrypting.");
            return;
        }

        try {
            const data = {
                id,
                senPubKey,
                recPrivKey
            };
            const res = await axios.post(`/api/message/decrypt`, {
                data
            });
            if (res.status === 200) {
                setDecrypted(res.data.decryptedMessage.message);
                setError(""); 
            } else {
                console.warn("Decryption request failed:", res.status);
                setError("Decryption failed. Please try again.");
            }
        } catch (error) {
            console.error("Error decrypting the message:", error);
            setError("Error decrypting the message. Please try again.");
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

                    <div className="mt-4">
                        <label htmlFor="senPubKey" className="text-sm font-medium text-white mb-1 block">
                            Sender's Public Key:
                        </label>
                        <input
                            id="senPubKey"
                            type="text"
                            value={senPubKey}
                            onChange={(e) => setSenPubKey(e.target.value)}
                            placeholder="Enter sender's public key"
                            className="w-full rounded-md bg-gray-700 border border-white/20 text-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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

            {error && (
                <div className="text-red-500 mt-2">
                    <strong>{error}</strong>
                </div>
            )}

            <div className="flex justify-end gap-4 mt-4">
                <button 
                    onClick={() => handleVerify(message.id)}
                    className="rounded-3xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-black h-10">
                    Verify
                </button>
                <button
                    onClick={() => handleDecrypt(message.id)}
                    disabled={!verified}
                    className={`rounded-3xl px-3 py-2 text-sm font-semibold text-white hover:bg-black h-10 ${verified ? "bg-green-500" : "bg-gray-500 cursor-not-allowed"}`}
                >
                    Decrypt
                </button>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import SendLogo from "@/icons/sendlogo";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SentForm({ session }) {
    const router = useRouter();
    const [receiver, setReceiver] = useState("");
    const [sending, setSending] = useState(true); 

    const handleChangeReceiver = (e) => {
        setReceiver(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        const senUsername = session.user.username;
        const senPrivKey = localStorage.getItem(`privKey-${senUsername}`);

        const messageData = {
            subject: e.target.subject.value,
            message: e.target.message.value,
            receiver,
            sender: senUsername,
            senPrivKey,
            recPubKey: e.target.recPubKey.value,
        };

        try {
            const res = await axios.post("/api/message", messageData, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 201) {
                setTimeout(() => {
                    alert("Mail sent");
                    router.push("/inbox");
                }, 100);
            }
        } catch (error) {
            console.error("Error while saving the message to db: ", error);
        } finally {
            setSending(false); 
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="flex text-2xl items-center">
                    <div className="py-2">To: </div>
                    <div className="ml-8">
                        <input
                            type="text"
                            id="receiver"
                            name="receiver"
                            required
                            placeholder="abayush"
                            className="bg-white/10 rounded-xl w-36 py-2 px-6 text-white"
                            onChange={handleChangeReceiver}
                        />
                    </div>
                </div>

                <div className="bg-white/10 rounded-xl py-2 px-6 text-2xl w-full">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        placeholder="Subject"
                        className="mt-1 block w-full focus:outline-none text-white bg-transparent"
                    />
                </div>

                <div className="bg-white/10 rounded-xl py-2 px-6 text-2xl w-full flex-grow">
                    <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Message"
                        className="mt-1 block w-full h-32 resize-none focus:outline-none text-white bg-transparent"
                    />
                </div>

                <div className="bg-white/10 rounded-xl py-2 px-6 text-2xl w-full">
                    <input
                        type="text"
                        id="recPubKey"
                        name="recPubKey"
                        required
                        placeholder="Recipient's Public Key"
                        className="mt-1 block w-full focus:outline-none text-white bg-transparent"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={sending}
                        className={`bg-white/10 text-2xl text-white py-2 px-4 rounded-lg transition-opacity duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                            sending ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        <div className="flex gap-4 items-center">
                            {!sending && <SendLogo />}
                            <div className="text-green-500">
                                {sending ? "Sending..." : "Send"}
                            </div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}

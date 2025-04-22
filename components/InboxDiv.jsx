"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import MessageDetail from "@/components/MessageDetail";

export default function InboxDiv({ session }) {
    const [messages, setMessages] = useState([]);
    const [openIndex, setOpenIndex] = useState(null); // store index of expanded message

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const user = session.user.username;
                const res = await axios.get(`/api/message?user=${user}`);
                if (res.status === 200) {
                    setMessages(res.data.messages);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
                setMessages([]);
            }
        };

        fetchMessages();
    }, [session]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} className="mb-4 w-full">
                        <div
                            className="flex justify-between border-b border-white py-2 px-2 cursor-pointer"
                            onClick={() => handleToggle(index)}
                        >
                            <div className="flex gap-4">
                                <div>{msg.sender}</div>
                                <div>{msg.subject}</div>
                            </div>
                            <div className="flex gap-4">
                                <button className="text-blue-500">Verify</button>
                                <button className="text-green-500">Decrypt</button>
                            </div>
                        </div>

                        {openIndex == index && (
                            <div className="w-full max-w-full overflow-hidden">
                                <MessageDetail session={session} message={msg} onClose={() => setOpenIndex(null)} />
                            </div>
                        )}

                    </div>


                ))
            ) : (
                <p className="text-gray-400">No messages found.</p>
            )}
        </div>
    );
}

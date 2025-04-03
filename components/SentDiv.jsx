"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function InboxDiv({ session }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const user = session.user.username;
                const res = await axios.get(`/api/message/sent?user=${user}`);

                if (res.status === 201) {
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

    return (
        <div>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} className="flex justify-between border-b border-white py-2">
                        <div className="flex gap-4">
                            <div>{msg.sender}</div>
                            <div>{msg.subject}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No messages found.</p>
            )}
        </div>
    );
}

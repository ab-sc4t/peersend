"use client";

import { useState } from "react";
import SendLogo from "@/icons/sendlogo";
import axios from "axios";

export default function SentForm({ session }) {
    const [receiver, setReceiver] = useState("");

    const handleChangeReceiver = (e) => {
        setReceiver(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageData = {
            subject: e.target.subject.value,
            message: e.target.message.value,
            receiver: receiver,
            sender: session.user.username, 
        };
        console.log(messageData);
        try{
            const res = axios.post("/api/message", {messageData}, {headers:{"Content-Type": "application/json"}});
            const data = await res.data;
            if (res.status==201){
                alert("Mail sent");
                //route to sent mails of the sender
            }
        } catch (error){
            console.error("Error while saving the message to db: ", error);
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

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-white/10 text-2xl text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        <div className="flex gap-4">
                            <SendLogo />
                            <div className="text-green-500">Send</div>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}

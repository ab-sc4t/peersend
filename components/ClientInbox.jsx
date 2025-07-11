"use client";

import { useState } from "react";
import InboxDiv from "@/components/InboxDiv";
import SentDiv from "@/components/SentDiv";
import InboxLogo from "@/icons/inboxlogo";
import SentLogo from "@/icons/sentlogo";
import Button from "@/ui/Button";

export default function ClientInbox({ session }) {
    const [selectedTab, setSelectedTab] = useState("inbox");

    return (
        <div
            className="h-screen bg-cover bg-center flex p-20 gap-4"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <div className="bg-white/10 rounded-xl py-4 px-12 flex flex-col justify-between">
                <div>
                    <div
                        className={`flex gap-2 text-2xl cursor-pointer p-2 ${selectedTab === "inbox" ? "border-b-2 border-white" : ""}`}
                        onClick={() => setSelectedTab("inbox")}
                    >
                        <InboxLogo />
                        <div className="flex justify-center items-center">Inbox</div>
                    </div>

                    <div
                        className={`flex gap-2 text-2xl cursor-pointer p-2 ${selectedTab === "sent" ? "border-b-2 border-white" : ""}`}
                        onClick={() => setSelectedTab("sent")}
                    >
                        <SentLogo />
                        <div className="flex justify-center items-center">Sent</div>
                    </div>
                </div>
                <div className="mt-auto pt-8">
                    <Button
                        text="Compose"
                        href="/sent"
                    />
                </div>
            </div>

            <div className="bg-white/10 rounded-xl py-4 px-12 text-2xl w-full">
                {selectedTab === "inbox" ? <InboxDiv session={session} /> : <SentDiv session={session} />}
            </div>
        </div>
    );
}

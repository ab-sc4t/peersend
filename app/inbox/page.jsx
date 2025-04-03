import InboxLogo from "@/icons/inboxlogo";
import SentLogo from "@/icons/sentlogo";

export default function Inbox() {
    return (
        <div
            className="h-screen bg-cover bg-center flex p-20 gap-4"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <div className="bg-white/10 ronuded-xl py-4 px-12 rounded-xl">
                <div className="flex gap-2 text-2xl">
                    <div>
                        <InboxLogo/>
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            Inbox
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 text-2xl">
                    <div>
                        <SentLogo/>
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            Sent
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white/10 ronuded-xl py-4 px-12 rounded-xl text-2xl w-screen"> 
                <div>
                    <div className="flex justify-between border-b order-white">
                        <div className="flex gap-4">
                            <div>User A</div>
                            <div>Preparation for Placements-Physical Aptitude</div>
                        </div>
                        <div className="flex gap-4">
                            <div>Verify</div>
                            <div>Decrypt</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SentForm from "@/components/SentForm";
import { redirect } from "next/navigation";

export default async function SentPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    return (
        <div
            className="flex flex-col gap-8 p-20 h-screen bg-center bg-cover"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <SentForm session={session} />
        </div>
    );
}

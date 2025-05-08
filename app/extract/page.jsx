import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation"; 
import ExtractPrivKeyClient from "@/components/ExtractPrivKeyClient";

export default async function ExtractPrivKeyPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin");
        return; 
    }
    return <ExtractPrivKeyClient session={session} />;
}

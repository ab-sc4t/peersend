import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ExtractPrivKeyClient from "@/components/ExtractPrivKeyClient";

export default async function ExtractPrivKeyPage() {
    const session = await getServerSession(authOptions);

    return <ExtractPrivKeyClient session={session} />;
}

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientInbox from "@/components/ClientInbox";

export default async function Inbox() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

    return <ClientInbox session={session} />;
}

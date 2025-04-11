import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ClientInbox from "@/components/ClientInbox";

export default async function Inbox() {
    const session = await getServerSession(authOptions);

    return (
        <ClientInbox session={session} />
    );
}
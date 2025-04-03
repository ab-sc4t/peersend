import InboxDiv from "@/components/InboxDiv";
import SentDiv from "@/components/SentDiv";
import InboxLogo from "@/icons/inboxlogo";
import SentLogo from "@/icons/sentlogo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ClientInbox from "@/components/ClientInbox";

export default async function Inbox() {
    const session = await getServerSession(authOptions);

    return (
        <ClientInbox session={session} />
    );
}
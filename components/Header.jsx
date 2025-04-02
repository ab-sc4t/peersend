import { authOptions } from "@/lib/auth";
import Button from "@/ui/Button";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";

export default async function Header() {
    const session = await getServerSession(authOptions)
    console.log(session);
    return (
        <div className="fixed top-0 left-0 w-screen flex justify-between px-8 py-2 bg-white/10 rounded-bl-xl rounded-br-xl">
            <div className="text-5xl">
                PeerSend
            </div>
            <div className="flex justify-center items-center gap-4">
                {session?.user ? (
                    <>
                        <span className="text-xl p-2">
                            Welcome, {session.user.firstname || 'User'}!
                        </span>
                        <div>
                            <LogoutButton />
                        </div>
                    </>
                ) : (
                    <>
                        <Button
                            text="Register"
                            href="/signup"
                        />
                        <Button
                            text="Login"
                            href="/signin"
                        />
                    </>
                )}
            </div>
        </div>
    )
}
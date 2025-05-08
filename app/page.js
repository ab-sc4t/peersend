import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <LandingPage session={session}/>
    </div>
  );
}

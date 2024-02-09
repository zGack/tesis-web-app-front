import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Profile from "./ui/Profile";

export default async function ProfilePage() {

  const session = await auth();

  if ( !session?.user ) {
    redirect('/login');
  }

  return (
    <Profile {...session!.user} />
  )
}

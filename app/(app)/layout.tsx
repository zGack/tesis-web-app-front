import { auth } from "@/auth.config";
import { Header } from "@/components/ui";
import { redirect } from "next/navigation";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header currentUserRoles={session.user.role} />
      {children}
    </main>
  );
}

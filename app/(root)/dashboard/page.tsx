"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  });

  const { data: dataSession } = useSession();
  return (
    <>
      <div className="text-4xl font-bold text-center">
        Seja bem vindo
        <pre className="text-slate-300">{dataSession?.user?.name}</pre>
      </div>
      <Button variant="ghost" onClick={handleSignOut}>Sair</Button>
    </>
  );
};

export default Dashboard;

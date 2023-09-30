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
      router.push("/");
    }
  });

  const { data: dataSession } = useSession();
  return (
    <>
      <div>{dataSession?.user?.email}</div>;
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
};

export default Dashboard;

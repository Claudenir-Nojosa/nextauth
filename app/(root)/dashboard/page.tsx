"use client";
import { title } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const { data: dataSession } = useSession();
  return (
    <>
      {session.status === "unauthenticated" ? (
        <div>
          Por favor,
          <Link className="underline text-slate-400 px-1" href="/login">
            faça login
          </Link>
          para visualizar o dashboard.
        </div>
      ) : (
        <div>
          <div className="text-4xl font-bold text-center justify-center flex flex-col items-center gap-3">
            <p className={title({ color: "cyan", size: "lg" })}>
              Seja bem vindo!
            </p>
            <pre>{dataSession?.user?.name}</pre>
            {dataSession?.user?.image === null ? (
              ""
            ) : (
              <Image
                className="rounded-full"
                src={dataSession?.user?.image || ""}
                height={100}
                width={100}
                alt={`${dataSession?.user?.name} profile pic`}
              />
            )}
            <Button
              className="mt-10 hover:bg-slate-800"
              variant="outline"
              onClick={handleSignOut}
            >
              Sair
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

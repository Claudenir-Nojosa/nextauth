"use client";
import { useEffect } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      toast.success("Login efetuado com sucesso!");
      setTimeout(() => {
        router.push("/");
      }, 800);
    }
  }, [session.status]);
  return <LoginForm />;
};

export default Page;

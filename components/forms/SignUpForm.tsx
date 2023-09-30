"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = data;

    if (password === "" || email === "") {
      toast({
        description: "Informe todos os campos",
        className: "error-toast",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        description: "Senha deve conter no mínimo 6 caracteres",
        className: "error-toast",
      });
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error == null) {
        toast({
          description: "Usuário logado.",
        });
        router.push("/");
      } else {
        toast({
          description: "Aconteceu um erro ao fazer login",
          className: "error-toast",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 m-auto mt-24 ">
      <h2 className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <input
              className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4"
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className="flex relative">
            <input
              className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4"
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
        </div>

        <button
          className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
      <Button onClick={() => signIn("github")}>Github</Button>
      <Button onClick={() => signIn("google")}>Google</Button>
    </section>
  );
};

export default LoginForm;

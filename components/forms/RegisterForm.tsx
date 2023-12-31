"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/lib/validations/user";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { GithubIcon, GoogleIcon } from "@/config/icons";
import { title as textTitle } from "../shared/Primitives";
const RegisterForm = () => {
  const router = useRouter();
  if (process.env.node_env !== "production") console.log(axios);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    values
  ) => {
    console.log(values);
    try {
      const response = await axios.post(
        "/api/register",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <h1 className={`text-2xl ${textTitle({ color: "violet" })}`}>
        Criar conta
      </h1>
      <Card className="min-w-[400px] max-h-[800px] bg-black border rounded-lg p-10 pb-2 mt-6">
        <Form {...form}>
          <CardBody>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button
                  className="hover:text-zinc-400 w-full mt-5"
                  variant="outline"
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="flex justify-center items-center">
            <div>
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                ou
              </div>
              <div className="gap-3 flex flex-col justify-center items-center">
                <Button
                  className="hover:text-zinc-400 w-full"
                  variant="outline"
                  onClick={() => signIn("github")}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Login com Github
                </Button>
                <Button
                  className="hover:text-zinc-400 w-full"
                  variant="outline"
                  onClick={() => signIn("google")}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Login com Google
                </Button>
              </div>
              <p className="text-center text-sm text-slate-300 mt-10">
                Você já possui uma conta?
                <Link
                  className="text-violet-400 hover:underline ml-2"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

export default RegisterForm;

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginSchema } from "@/lib/validations/user";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { GithubIcon, GoogleIcon } from "@/config/icons";
import { toast } from "sonner";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  });
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const googleSignInHandler = async () => {
    await signIn("google");
  };
  const githubSignInHandler = async () => {
    await signIn("github");
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("Aconteceu um erro ao fazer login", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card className="max-w-[400px] bg-slate-800 border rounded-lg p-10 pb-2">
        <Form {...form}>
          <CardBody>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  className="hover:bg-slate-800"
                  variant="outline"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <div className="flex flex-col justify-center items-center">
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                ou
              </div>
              <div className="gap-3 flex flex-col justify-center items-center">
                <Button
                  className="hover:bg-slate-800"
                  variant="outline"
                  onClick={githubSignInHandler}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Login com Github
                </Button>
                <Button
                  className="hover:bg-slate-800"
                  variant="outline"
                  onClick={googleSignInHandler}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Login com Google
                </Button>
              </div>
              <p className="text-center text-sm text-slate-300 mt-10">
                Se você não possui uma conta
                <Link
                  className="text-blue-500 hover:underline ml-2"
                  href="/register"
                >
                  Registrar
                </Link>
              </p>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;

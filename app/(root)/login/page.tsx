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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z
    .string({ required_error: "Insira seu e-mail" })
    .min(1, { message: "Insira seu e-mail" }),
  password: z
    .string({ required_error: "Insira sua senha" })
    .min(1, { message: "Insira sua senha" })
    .min(6, { message: "Senha deve conter no mínimo 6 caracteres" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
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
          <Button type="submit">Login</Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          ou
        </div>
        <Button onClick={() => signIn("github")}>Github</Button>
        <Button onClick={() => signIn("google")}>Google</Button>
        <p className="text-center text-sm text-gray-600 mt-2">
          Se você não possui uma conta
          <Link className="text-blue-500 hover:underline ml-2" href="/register">
            Registrar
          </Link>
        </p>
      </Form>
    </>
  );
};

export default LoginForm;

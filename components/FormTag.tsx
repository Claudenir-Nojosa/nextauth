"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

import { FormSchema } from "@/lib/validations/post";
import { FC } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TagSchema } from "@/lib/validations/tag";

export interface TagProps {
  name: string;
  id: string;
  userId: string | null;
}

export const FormTag: FC<TagProps> = () => {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
  });
  const router = useRouter();

  const { mutate: createTag, isLoading: isLoadingCreateTag } = useMutation<
    Post,
    unknown,
    z.infer<typeof TagSchema>
  >({
    mutationFn: async (newPostData) => {
      const response = await axios.post("/api/tags/create", newPostData);
      return response.data;
    },
    onSuccess: (data) => {
      // Faça o redirecionamento após a criação bem-sucedida
      toast.success("Tag criada com sucesso!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar a Tag, tente novamente");
    },
  });

  function onSubmit(data: z.infer<typeof TagSchema>) {
    createTag(data);

    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[32rem] min-h-[32rem] space-y-10 bg-black  rounded-xl mx-10 p-4 mt-6 border-slate-200 border"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Nome da Tag</FormLabel>
              <FormControl>
                <Input placeholder="Insira aqui o nome da Tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="submit"
            className="hover:text-zinc-400"
          >
            <Link href="/">Cancelar</Link>
          </Button>
          <Button
            variant="outline"
            type="submit"
            className="hover:text-zinc-400"
          >
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
};

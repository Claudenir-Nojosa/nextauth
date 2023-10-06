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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FormSchema } from "@/lib/validations/post";
import { FC } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormPostProps {
  isEditing: boolean;
}

export const FormPost: FC<FormPostProps> = ({ isEditing }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  // fetch list tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });
  const { mutate: createPost, isLoading } = useMutation<
    Post,
    unknown,
    z.infer<typeof FormSchema>
  >({
    mutationFn: async (newPostData) => {
      const response = await axios.post("/api/posts/create", newPostData);
      return response.data;
    },
    onSuccess: (data) => {
      // Faça o redirecionamento após a criação bem-sucedida
      toast.success("Post criado com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar o Post, tente novamente");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createPost(data);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-1/3 max-w-3xl space-y-6 bg-slate-900  rounded-xl mx-10 p-4 mt-6 border-slate-200 border min-w-[10rem]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Insira aqui o título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nos conte o que você tem a dizer."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoadingTags ? (
          <div>Carregando...</div>
        ) : (
          <FormField
            control={form.control}
            name="tagId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ferramenta</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione " />
                    </SelectTrigger>

                    <SelectContent className="bg-black">
                      {dataTags?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="submit">
            <Link href="/">Cancelar</Link>
          </Button>
          <Button variant="outline" type="submit">
            {isEditing ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

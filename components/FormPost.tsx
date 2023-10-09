"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { FC, useEffect } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInputPost } from "@/types";
import Loading from "./Loading";
import { TagProps } from "./FormTag";

interface FormPostProps {
  isEditing: boolean;
  initialValue?: FormInputPost;
  params: {
    id: string;
  };
}

export const FormPost: FC<FormPostProps> = ({
  isEditing,
  initialValue,
  params,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValue,
  });
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (initialValue) {
      // Define os valores iniciais no formulário após a montagem do componente
      form.reset(initialValue);
    }
  }, [initialValue]);
  // fetch list tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<TagProps[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data as Tag[];
    },
  });
  const { mutate: createPost, isLoading: isLoadingCreatePost } = useMutation<
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
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao criar o Post, tente novamente");
    },
  });
  const { mutate: updatePost, isLoading: isLoadingEdit } = useMutation<
    Post,
    unknown,
    z.infer<typeof FormSchema>
  >({
    mutationFn: async (newPostData) => {
      const response = await axios.patch(`/api/posts/${id}`, newPostData);
      return response.data;
    },
    onSuccess: (data) => {
      // Faça o redirecionamento após a criação bem-sucedida
      toast.success("Post editado com sucesso!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao editar o Post, tente novamente");
    },
  });
  if (isLoadingEdit) {
    return <Loading />;
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    {
      isEditing && updatePost(data);
    }
    {
      !isEditing && createPost(data);
    }
    console.log(data);
  }
  const defaultValue =
    initialValue && dataTags
      ? dataTags.find((tag) => tag.id === initialValue.tagId)?.name || ""
      : "Selecione";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[32rem] min-h-[32rem] space-y-10 bg-black  rounded-xl mx-10 p-4 mt-6 border-slate-200 border"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Titulo</FormLabel>
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
              <FormLabel className="text-2xl">Conteúdo</FormLabel>
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
                <FormLabel className="text-2xl">Ferramenta</FormLabel>
                <FormControl>
                  {dataTags?.length === 0 ? (
                    <div>Sem Tags ainda</div>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        initialValue && dataTags
                          ? dataTags.find(
                              (tag) => tag.id === initialValue.tagId
                            )?.name || ""
                          : ""
                      }
                    >
                      <SelectTrigger className="w-full text-zinc-400">
                        <SelectValue placeholder={`${defaultValue}`} />
                      </SelectTrigger>

                      <SelectContent className="bg-black text-zinc-300">
                        {dataTags?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
            {isLoadingCreatePost ? <Loading /> : ""}
            {isLoadingCreatePost
              ? "Criando..."
              : isEditing
              ? "Atualizar"
              : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

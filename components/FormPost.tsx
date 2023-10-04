"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { toast } from "sonner";
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

interface FormPostProps {
  isEditing: boolean;
}

export const FormPost: FC<FormPostProps> = ({ isEditing }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
        <FormField
          control={form.control}
          name="tag"
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
                    <SelectItem value="Nextjs">Nextjs</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Prisma">Prisma</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

"use client";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const Icons = {
  spinner: Loader2,
};
interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading: isLoadingDelete } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },

    onSuccess: (data) => {
      // Faça o redirecionamento após a criação bem-sucedida
      toast.success("Post deletado com sucesso!");
      router.push("/");
      router.refresh();
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao deletar o Post, tente novamente");
    },
  });
  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      <Button variant="ghost" className="bg-slate-800">
        <Link href={`/edit/${id}`}>
          <Pencil />
        </Link>
      </Button>
      <Button
        onClick={() => deletePost()}
        className="bg-red-700"
        variant="ghost"
      >
        {isLoadingDelete ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Trash />
        )}
      </Button>
    </div>
  );
};

export default ButtonAction;

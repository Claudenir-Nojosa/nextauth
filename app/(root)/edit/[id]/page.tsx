"use client";
import { FormPost } from "@/components/FormPost";
import { title as textTitle } from "@/components/shared/Primitives";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage: FC<EditPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    },
  });

  return (
    <>
      <h1 className={textTitle({ color: "violet" })}>Editar Post</h1>
      <FormPost isEditing={true} initialValue={dataPost} params={params} />
    </>
  );
};

export default EditPostPage;

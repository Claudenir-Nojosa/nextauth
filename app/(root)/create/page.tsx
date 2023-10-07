import { FormPost } from "@/components/FormPost";
import { title as textTitle } from "@/components/shared/Primitives";
import React, { FC } from "react";

interface CreatePostPageProps {
  params: {
    id: string;
  };
}

const CreatePage: FC<CreatePostPageProps> = ({ params }) => {
  return (
    <>
      <h1 className={textTitle({ color: "cyan" })}>Criar Post</h1>
      <FormPost isEditing={false} params={params} />
    </>
  );
};

export default CreatePage;

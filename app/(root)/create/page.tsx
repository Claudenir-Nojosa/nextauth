import { FormPost } from "@/components/FormPost";
import { title } from "@/components/shared/primitives";
import React from "react";

const CreatePage = () => {
  return (
    <>
      <h1 className={title({ color: "cyan"})}>Criar Post</h1>
      <FormPost isEditing={false} />
    </>
  );
};

export default CreatePage;

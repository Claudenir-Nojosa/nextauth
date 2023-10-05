import { FormPost } from "@/components/FormPost";
import { title as textTitle } from "@/components/shared/Primitives";
import React from "react";

const CreatePage = () => {
  return (
    <>
      <h1 className={textTitle({ color: "cyan" })}>Criar Post</h1>
      <FormPost isEditing={false} />
    </>
  );
};

export default CreatePage;

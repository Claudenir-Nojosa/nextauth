"use client";

import { FormPost } from "@/components/FormPost";
import { title as textTitle } from "@/components/shared/Primitives";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";

interface CreatePostPageProps {
  params: {
    id: string;
  };
}

const CreatePage: FC<CreatePostPageProps> = ({ params }) => {
  const session = useSession();

  return (
    <>
      {session.status === "unauthenticated" ? (
        <>
          <h1 className={textTitle({ color: "cyan", size: "lg" })}>
            Criar
          </h1>
          <div className="mt-6">
            Por favor,
            <Link className="underline text-slate-400 px-1" href="/login">
              faça login
            </Link>
            para visualizar a página de criação.
          </div>
        </>
      ) : (
        <>
          <h1 className={textTitle({ color: "cyan" })}>Criar Post</h1>
          <FormPost isEditing={false} params={params} />
        </>
      )}
    </>
  );
};

export default CreatePage;

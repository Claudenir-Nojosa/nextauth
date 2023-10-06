import ButtonAction from "@/components/ButtonAction";
import { db } from "@/lib/prismadb";
import React, { FC } from "react";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

async function getPosts(id: string) {
  const response = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      Tag: true,
    },
  });
  return response;
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const post = await getPosts(params.id);

  console.log(post);
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">{post?.title}</h2>
      </div>
      <span>{post?.Tag.name}</span>
      <p className="text-slate-500">{post?.content}</p>
      <ButtonAction />
    </>
  );
};

export default BlogDetailPage;

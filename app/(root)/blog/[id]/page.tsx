import ButtonAction from "@/components/ButtonAction";
import { db } from "@/lib/prismadb";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  return (
    <Card className="max-w-5xl">
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>
        <CardDescription>{post?.Tag.name}</CardDescription>
      </CardHeader>
      <Separator className="bg-white my-4" />
      <CardContent>
        <p>{post?.content}</p>
      </CardContent>
      <Separator className="bg-white my-4" />
      <CardFooter>
        <ButtonAction id={params.id} />
      </CardFooter>
    </Card>
  );
};

export default BlogDetailPage;

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
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { title } from "@/components/shared/Primitives";
import { Textarea } from "@/components/ui/textarea";

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
    <MaxWidthWrapper>
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle className={title({ color: "violet" })}>
            {post?.title}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {post?.Tag.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea className="resize-none min-h-[18rem] text-zinc-300">{post?.content}</Textarea>
        </CardContent>
        <CardFooter>
          <ButtonAction id={params.id} />
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default BlogDetailPage;

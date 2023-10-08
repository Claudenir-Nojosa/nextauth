import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { title as textTitle } from "./shared/Primitives";
import { Tag, User } from "@prisma/client";
import { FC } from "react";
import { Textarea } from "./ui/textarea";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    Tag: Tag;
    User: User;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { title, content, Tag, id } = post;
  return (
    <Card className="min-w-[10rem] min-h-[20rem] flex flex-col justify-center text-start">
      <CardHeader>
        <CardTitle className={textTitle({ color: "violet", size: "md" })}>
          {title}
        </CardTitle>
        <CardDescription className="text-zinc-400">{Tag.name}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Textarea className="resize-none border-none text-zinc-300">
          {content.length > 30
            ? `${content.slice(0, 30)}...`
            : `${content.slice(0, 30)}`}
        </Textarea>
      </CardContent>

      <CardFooter>
        <Button variant="outline">
          <Link href={`/blog/${id}`} className="hover:underline">
            Ler mais...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

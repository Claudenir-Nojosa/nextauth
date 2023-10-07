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
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className={textTitle({ color: "cyan", size: "sm" })}>
          {title}
        </CardTitle>
        <CardDescription>{Tag.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content.slice(0, 100)}</p>
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

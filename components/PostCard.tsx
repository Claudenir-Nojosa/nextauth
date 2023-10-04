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
import { title } from "./shared/primitives";
const PostCard = () => {
  return (
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className={title({ color: "cyan", size: "sm" })}>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Link href="/blog/1" className="hover:underline">
            Ler mais...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

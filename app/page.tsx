"use client";

import Link from "next/link";
import PostCard from "@/components/PostCard";
import { title as textTitle } from "@/components/shared/Primitives";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag, User } from "@prisma/client";
import Loading from "@/components/Loading";

export interface Posts {
  id: string;
  title: string;
  content: string;
  userId: string;
  Tag: Tag;
  User: User;
}

export default function Home() {
  const {
    data: dataPosts,
    data: dataSession,
    isLoading: isLoadingPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("/api/posts");
      return data.posts as Posts[];
    },
  });

  if (isLoadingPosts) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className={textTitle({ color: "cyan", size: "lg" })}>Home</h1>
      {dataSession ? (
        <div>
          <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 ">
            {dataPosts.map((post: Posts) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>
            <Link className="underline text-slate-400" href="/login">
              Faça login
            </Link>
            para visualizar os dados da conta.
          </p>
        </div>
      )}
    </div>
  );
}

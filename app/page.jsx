import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { title } from "@/components/shared/primitives";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className={title({color: "cyan", size: "lg"})}>Home</h1>
      <h2 className="text-2xl">Rendered by the Server</h2>
      {session ? (
        <div>
          <pre className="hidden xl:inline-block">{JSON.stringify(session)}</pre>
          <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 ">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
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

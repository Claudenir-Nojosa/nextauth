import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <h2 className="text-2xl">Rendered by the Server</h2>
      {session ? (
        <div>
          <pre>{JSON.stringify(session)}</pre>
          <PostCard />
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
    </>
  );
}

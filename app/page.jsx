import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <h2 className="text-2xl">Rendered by the Server</h2>
      {session ? (
        <pre>{JSON.stringify(session)}</pre>
      ) : (
        <p>
          <Link className="underline text-slate-400" href="/login">Faça login</Link> para visualizar os dados da
          conta.
        </p>
      )}
    </>
  );
}

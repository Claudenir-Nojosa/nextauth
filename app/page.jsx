import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <h2 className="text-2xl">Rendered by the Server</h2>
      {session ? (
        <pre>{JSON.stringify(session)}</pre>
      ) : (
        <p>Faça login para visualizar os dados da conta.</p>
      )}
    </>
  );
}

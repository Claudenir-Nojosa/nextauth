import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Rendered by the Server</h1>
      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}

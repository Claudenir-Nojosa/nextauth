import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <p>Rendered by the Server</p>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}

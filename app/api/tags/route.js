import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("No session found", { status: 401 });
    const tags = await db.tag.findMany({
      select: {
        id: true,
        name: true,
        User: true,
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch tags" },
      { status: 500 }
    );
  }
}

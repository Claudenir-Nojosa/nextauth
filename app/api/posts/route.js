import { db } from "@/lib/prismadb";
import { z } from "zod";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session.user.id);
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const posts = await db.post.findMany({
      select: {
        userId: true,
        id: true,
        title: true,
        content: true,
        Tag: true,
        User: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({posts}, session, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response(error.issues[0].message, { status: 422 });
    return NextResponse.json(
      { message: "Could not fetch tags" },
      { status: 500 }
    );
  }
}

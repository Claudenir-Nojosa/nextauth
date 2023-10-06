import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        Tag: {
          connect: {
            id: body.tagId,
          },
        },
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create post" },
      { status: 500 },
      console.log(error)
    );
  }
}

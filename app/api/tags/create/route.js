import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();

    const tag = await db.tag.create({
      data: {
        name: body.name,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return NextResponse.json(tag, session, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create tag" },
      { status: 500 },
      console.log(error)
    );
  }
}

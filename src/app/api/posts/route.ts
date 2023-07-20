import { NextRequest, NextResponse } from "next/server";
import { createPost, getPostsByEmail } from "@/service/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/service/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("인증 에러!", { status: 401 });
  }

  return (
    session.user?.email &&
    getPostsByEmail(session.user.email).then((data) => NextResponse.json(data))
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return new Response("인증 에러!", { status: 401 });
  }
  const user = await getUserByEmail(session.user.email);

  const form = await req.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return NextResponse.json("bad request", { status: 400 });
  }

  const status = await createPost(user.id, text, file);
  return NextResponse.json(status);
}

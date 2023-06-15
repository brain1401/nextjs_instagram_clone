import { getMyServerSession } from "@/service/getMyServerSessionData";
import { NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { getFollwingPostsof } from "@/service/posts";

export async function GET() {
  const { data: user } = await getMyServerSession(handler);

  if (!user) {
    return new Response("인증 에러!", { status: 401 });
  }

  return getFollwingPostsof(user.username).then((data) =>
    NextResponse.json(data)
  );
}

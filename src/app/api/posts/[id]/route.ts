import { NextRequest, NextResponse } from "next/server";
import { getFollwingPostsof, getPost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
  params: {id: string};
}

export async function GET(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("인증 에러!", { status: 401 });
  }

  const data = await getPost(context.params.id);

  const returnData = data[0];

  return NextResponse.json(returnData);
}

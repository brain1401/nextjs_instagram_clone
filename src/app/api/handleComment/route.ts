import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/service/posts";
import useMe from "@/hooks/me";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/service/user";

type Response = {
  postId: number;
  comment: string;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email && await getUserByEmail(session?.user?.email);

  if (!session || !user) {
    return NextResponse.json({ error: "인증 에러!" }, { status: 401 });
  }

  const { postId, comment }: Response = await req.json();

  if (!postId || comment === undefined) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  if (Boolean(user.insta_posts.find((item) => item.id === postId)) === false) {
    return NextResponse.json(
      { error: "유효하지 않은 사용자" },
      { status: 400 }
    );
  }

  return NextResponse.json(await addComment(user.id, postId, comment));
}

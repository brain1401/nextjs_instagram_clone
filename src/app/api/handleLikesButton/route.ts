import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getActionBarUserByEmail, getUserByEmail } from "@/service/user";
import { updateLikes } from "@/service/posts";

type Responese = {
  postid: number;
};

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user =
    session?.user?.email && (await getUserByEmail(session?.user?.email));

  if (!session || !session.user?.email || !user) {
    return NextResponse.json({ error: "세션이 없습니다." }, { status: 401 });
  }

  const { postid }: Responese = await request.json();

  if (!postid) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const result = await updateLikes(user, postid);

  return NextResponse.json(result);
}

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getActionBarUserByEmail } from "@/service/user";
import { updateBookmarks } from "@/service/posts";

type Responese = {
  postid: number;
};

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "세션이 없습니다." }, { status: 401 });
  }

  const user = await getActionBarUserByEmail(session.user.email);
  const { postid }: Responese = await request.json();

  if (!postid) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const result = await updateBookmarks(user, postid);

  return NextResponse.json(result);
}

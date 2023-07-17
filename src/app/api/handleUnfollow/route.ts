import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByEmail, handleUnfollow } from "@/service/user";

type Response = {
  userId: number;
};

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user =
    session?.user?.email && (await getUserByEmail(session.user.email));
  if (!user || !session) {
    return NextResponse.json({ data: "세션 인증 에러" }, { status: 401 });
  }

  const { userId }: Response = await req.json();
  if (userId === undefined) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  const response = await handleUnfollow(userId, user.id);

  return NextResponse.json(response);
}

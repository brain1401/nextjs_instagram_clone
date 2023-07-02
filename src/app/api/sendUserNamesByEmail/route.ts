import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { setUserNamesByEmail } from "@/service/user";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const res = await request.json();

  if (session?.user?.email) {
    await setUserNamesByEmail(
      res.displayname,
      res.realname,
      session.user.email
    );
  }

  return NextResponse.json({ res });
}

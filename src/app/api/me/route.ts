import { NextResponse } from "next/server";
import { getUserByEmail } from "@/service/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ response: "인증 에러!" }, { status: 401 });
  }

  return (
    session.user?.email &&
    getUserByEmail(session.user.email).then((data) => NextResponse.json(data))
  );
}

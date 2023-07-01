import { NextResponse } from "next/server";
import { getUsers } from "@/service/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("인증 에러!", { status: 401 });
  }

  return getUsers().then((data) =>
    NextResponse.json(data)
  );
}

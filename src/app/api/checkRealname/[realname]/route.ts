import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { isExistRealname } from "@/service/user";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { realname: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "에러!" }, { status: 401 });
  }
  const realname = params.realname;
  const value = await isExistRealname(realname);
  const returnValue = { data: value };

  return NextResponse.json(returnValue);
}

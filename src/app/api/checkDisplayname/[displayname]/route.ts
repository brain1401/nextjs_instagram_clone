import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { isExistDisplayname } from "@/service/user";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(request: Request,{ params }: {params: {displayname: string}}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "에러!" }, { status: 401 });
  }
  const displayname = params.displayname;
  const value = await isExistDisplayname(displayname);
  const returnValue = { data: value };

  return NextResponse.json(returnValue);
}

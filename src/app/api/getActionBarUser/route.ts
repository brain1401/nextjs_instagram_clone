import { getActionBarUserByEmail } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(_:NextRequest) {
  const session = await getServerSession(authOptions);
  if(!session || !session?.user?.email){
    throw new Error('세션 정보가 없숩니다!');
  }
  const email = session.user.email;
  return NextResponse.json(await getActionBarUserByEmail(email));
}
import { getMyServerSession } from "@/service/getMyServerSessionData";
import { NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { getUserByUsername } from "@/service/user";

export async function GET() {
  const {data : user, session} = await getMyServerSession(handler);

  if(!user){
    return new Response('인증 에러!', {status: 401});
  }


  return getUserByUsername(user.username)
  .then(data => NextResponse.json(data))
}

import { SessionUser } from "@/model/user";
import { NextAuthOptions, getServerSession } from "next-auth";

export async function getMyServerSession(authOption: NextAuthOptions) {
  const session = await getServerSession(authOption);

  const data: SessionUser = {
    username: session?.user.email.split("@")[0] || "",
    email: session?.user.email || "",
    name: session?.user.name || "",
    image: session?.user.image,
  };
  
  

  return {data, session};
}
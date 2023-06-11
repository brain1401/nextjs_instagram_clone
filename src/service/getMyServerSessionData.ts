import { User } from "@/model/user";
import { NextAuthOptions, getServerSession } from "next-auth";

export async function getMyServerSessionData(authOption: NextAuthOptions) {
  const session = await getServerSession(authOption);

  const user: User = {
    username: session?.user.email.split("@")[0] || "",
    email: session?.user.email || "",
    name: session?.user.name || "",
    image: session?.user.image,
  };
  
  

  return user;
}
import { NextAuthOptions, getServerSession } from "next-auth";

export async function getMyServerSession(authOption: NextAuthOptions) {
  const session = await getServerSession(authOption);
  let user = session?.user;
  
  user = {
    username : user?.email.split('@')[0] || '',
    email: user?.email || "",
    name: user?.name || "",
    image: user?.image,
  }

  return user;
}
import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler:NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({user: {id, name, image, email}}) {
      if(!email){
        return false;
      }
      addUser({
        id: id,
        name: name || "",
        image: image,
        email,
        username: email.split("@")[0] || "",
      });
      return true;
    },
    async session({session} ) {
      console.log("session 함수");
      console.log(session);
      
      const user = session?.user;
      if(user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        }
      }

      return session;
    },
  },

})

export { handler as GET, handler as POST };

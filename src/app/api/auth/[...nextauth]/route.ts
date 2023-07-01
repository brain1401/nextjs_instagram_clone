import { addUser, getUserByEmail } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      //로그인 할 때 실행될 코드블럭
      if (!email) {
        return false;
      }
      console.log(id);
      addUser({
        id: id,
        displayname: name || "",
        image: image,
        email,
      });
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const handler: NextAuthOptions = NextAuth(authOptions);

export { handler as GET, handler as POST };

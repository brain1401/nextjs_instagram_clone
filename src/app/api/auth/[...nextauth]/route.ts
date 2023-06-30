import { addUser } from "@/service/user";
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
      addUser({
        id: id,
        displayname: name || "",
        image: image,
        email,
        username: email.split("@")[0] || "",
      });
      return true;
    },
    async session({ session }) {
      //세션이 만들어 질 때 실행됨
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const handler: NextAuthOptions = NextAuth(authOptions);

export { handler as GET, handler as POST };

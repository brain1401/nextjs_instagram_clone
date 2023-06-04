import AuthContext from "@/context/AuthContext";
import Navbar from "./components/Navber";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${openSans.className} w-full max-w-screen-xl overflow-auto mx-auto`}
      >
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <Navbar />
          </header>
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}

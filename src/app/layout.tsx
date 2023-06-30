import AuthContext from "@/context/AuthContext";
import Navbar from "./components/Navber";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import SWRConfigContext from "@/context/SWRConfigContext";

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
        className={`${openSans.className}bg-neutral-50 w-full overflow-auto`}
      >
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-center">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}

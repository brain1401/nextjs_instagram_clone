import AuthContext from "@/context/AuthContext";
import Navbar from "./components/Navber";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s'
  },
  description: "Instagram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${openSans.className}bg-neutral-50 w-full h-fit overflow-auto`}
      >
        <AuthContext>
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="flex justify-center w-full max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}

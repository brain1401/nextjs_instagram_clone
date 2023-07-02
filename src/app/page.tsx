import { getServerSession } from "next-auth";
import FollowingBar from "./components/FollowingBar";
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { isNewUser } from "@/service/user";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  //로그인하지 않았다면 /auth/singin페이지로 리다이렉트 시킴
  if (!session) {
    redirect("/auth/signin");
  }
  //새로운 유저면(displayname과 realname을 설정하지 않았다면) /auth/enter-details로 리다이렉트 시킴
  else if (session?.user?.email) {
    const data = await isNewUser(session.user.email);
    if (data === true) {
      redirect("/enter-details");
    }
  }

  return (
    <>
      <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
        <div className="w-full basis-3/4 min-w-0">
          {session && <FollowingBar />}
          {session && <PostList />}
        </div>

        <div className="basis-1/4 ml-8">{session && <Sidebar />}</div>
      </section>
    </>
  );
}

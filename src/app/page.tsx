import { getServerSession } from "next-auth";
import FollowingBar from "./components/FollowingBar";
import PostList from "./components/PostList";
import { handler } from "./api/auth/[...nextauth]/route";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import { getMyServerSessionData } from "@/service/getMyServerSessionData";

export default async function HomePage() {
  const user = await getMyServerSessionData(handler);
  
  
  if (!user) {
    //로그인한 유저가 없다면 /auth/singin페이지로 리다이렉트 시킴
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        {user && <FollowingBar/>}
        {user && <PostList />}
      </div>

      <div className="basis-1/4">{user && <Sidebar user={user} />}</div>
    </section>
  );
}

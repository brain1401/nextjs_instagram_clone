import { getServerSession } from "next-auth";
import FollowingBar from "./components/FollowingBar";
import PostList from "./components/PostList";
import { handler } from "./api/auth/[...nextauth]/route";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import { getMyServerSession } from "@/service/getMyServerSessionData";

export default async function HomePage() {
  const {data, session} = await getMyServerSession(handler);
 
  if (!session) {
    //로그인한 유저가 없다면 /auth/singin페이지로 리다이렉트 시킴
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        {session && <FollowingBar />}
        {session && <PostList />}
      </div>

      <div className="basis-1/4">{session && <Sidebar user={data} />}</div>
    </section>
  );
}

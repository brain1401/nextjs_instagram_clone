import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import NewPost from "../components/NewPost";
import { getUserByEmail } from "@/service/user";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata:Metadata = {
  title: '새로운 포스트 업로드',
  description: "새로운 포스트를 게시할 수 있는 페이지입니다."
}

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user?.email) {
    redirect('/auth/signin')
  }
  const user = await getUserByEmail(session.user.email);

  return (
    <NewPost user={user}/>
  )
}
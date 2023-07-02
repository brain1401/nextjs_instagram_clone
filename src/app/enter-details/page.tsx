import { redirect} from "next/navigation";
import InputNameForms from "../components/InputNameForms";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { isNewUser } from "@/service/user";

export default async function EnterDetailPage() {
  
  const session = await getServerSession(authOptions);
  let newUser: boolean = false;

  if(!session) {
    redirect("/");
  }
  
  if(session?.user?.email){
    newUser = await isNewUser(session.user.email);
  }

  //새로운 유저(displayname이나 realname이 비어있음)가 아니면
  if (!newUser) {
      redirect("/");
  }
  

  return <>{session && newUser && <InputNameForms />}</>;
}

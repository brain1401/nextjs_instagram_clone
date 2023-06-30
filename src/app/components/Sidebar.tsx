import { getUserByUsername } from "@/service/user";
import Avatar from "./Avatar";
import { SessionUser } from "@/model/user";

type Props = {
  user: SessionUser;
}

export default async function Sidebar({user}: Props) {

  return (
    <>
      <div className="flex items-center">
        {user?.image && <Avatar image={user.image}/>}
        <div className="ml-4">
          <p className="font-bold">{user.name}</p>
          <p className="text-lg text-neutral-500 leading-4">{user?.username}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About · Help · Press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTAGRAM_CLONE from Aiden
      </p>
    </>
  );
}

import { SearchUser } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  user: SearchUser;
}

export default function UserCard({user}: Props) {

  return (
    <Link href={`/user/${user.displayname}`} className="flex items-center w-11/12 h-24 pl-3 m-2 mx-auto bg-white border border-gray-300 rounded-sm hover:bg-neutral-50">
      <Avatar image={user.userimage} />
      <div className="flex flex-col ml-3 text-neutral-500">
        <p className="font-bold text-black">{user.displayname}</p>
        <p>{user.realname}</p>
        <p className="text-sm"> {`${user.followers}팔로워 ${user.followings}팔로잉`}</p>
      </div>
    </Link>
  );
}
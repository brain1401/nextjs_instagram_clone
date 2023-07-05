import { SearchUser } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  user: SearchUser;
}

export default function UserCard({user}: Props) {

  return (
    <Link href={`/user/${user.displayname}`} className="flex border h-24 w-11/12 mx-auto m-2 border-gray-300 rounded-sm items-center pl-3 bg-white hover:bg-neutral-50">
      <Avatar image={user.userimage} />
      <div className="flex flex-col ml-3 text-neutral-500">
        <p className="text-black font-bold">{user.displayname}</p>
        <p>{user.realname}</p>
        <p className="text-sm"> {`${user.followers}팔로워 ${user.followings}팔로잉`}</p>
      </div>
    </Link>
  );
}
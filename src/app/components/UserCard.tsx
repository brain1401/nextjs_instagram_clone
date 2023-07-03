import { SearchUserType } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  user: SearchUserType;
}

export default function UserCard({user}: Props) {

  return (
    <Link href={`/user/${user.displayname}`} className="flex border h-24 w-11/12 mx-auto m-2 border-gray-300 items-center pl-3">
      <Avatar image={user.userimage} />
      <div className="flex flex-col ml-3">
        <span className="font-bold">{user.displayname}</span>
        <span>{user.realname}</span>
        <span>{`${user.followers}팔로워 ${user.followings}팔로잉`}</span>
      </div>
    </Link>
  );
}
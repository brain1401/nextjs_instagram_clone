"use client";
import Avatar from "./Avatar";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";
import { ResponseUser } from "@/model/user";
import useSWR from "swr";
import useMe from "@/hooks/me";

export default function FollowingBar() {
  const {
    user,
    isLoading: loading,
    error,
  } = useMe();
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 bm-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <BarLoader color="red" width={300} />
      ) : (
        (!user?.followings || user.followings.length === 0) && (
          <p>{`현재 팔로우 하고 있는 사용자가 없습니다!`}</p>
        )
      )}
      {user?.followings && user.followings.length > 0 && (
        <ScrollableBar itemClassname="flex flex-col items-center w-20">
          {user.followings.map((user) => (
            <Link href={`user/${user.displayname}`} key={user.realname}>
              <Avatar image={user.userimage} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {user.displayname}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

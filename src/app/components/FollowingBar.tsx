"use client";
import useSWR from "swr";

import Avatar from "./Avatar";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";
import { ResponseUser } from "@/model/user";

export default function FollowingBar() {
  const {
    data: user,
    isLoading: loading,
    error,
  } = useSWR<ResponseUser>("api/me");

  console.log("유저 데이터")
  console.log(user)
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
            <Link
              href={`user/${user.username}`}
              key={user.username}
            >
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

"use client";
import useSWR from "swr";

import Avatar from "./Avatar";
import { User, UserSchema } from "@/model/user";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<UserSchema>("api/me");
  // const users = data?.following;
  // const users = undefined;
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 bm-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <BarLoader color="red" width={300} />
      ) : (
        (!users || users.length === 0) && (
          <p>{`현재 팔로우 하고 있는 사용자가 없습니다!`}</p>
        )
      )}
      {users && users.length > 0 && (
        <ScrollableBar itemClassname="flex flex-col items-center w-20">
          {users.map(({ image, username }) => (
            <Link href={`user/${username}`} key={username}>
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {" "}
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

"use client";
import useSWR from "swr";

import Avatar from "./Avatar";
import { ResponseUsers, UserData } from "@/model/user";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const {
    data: response,
    isLoading: loading,
    error,
  } = useSWR<ResponseUsers>("api/me");

  if (!response || !response[0]?.attributes) {
    return null; // or some loading state
  }

  const data: UserData = {
    createdAt: response[0].attributes?.createdAt || "",
    updatedAt: response[0].attributes?.updatedAt || "",
    displayname: response[0].attributes?.displayname || "",
    email: response[0].attributes?.email || "",
    userimage: response[0].attributes?.userimage || "",
    username: response[0].attributes?.username || "",
    followings: response[0].attributes?.followings.data,
    followers: response[0].attributes?.followers.data,
  };

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 bm-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <BarLoader color="red" width={300} />
      ) : (
        (!data.followings || data.followings.length === 0) && (
          <p>{`현재 팔로우 하고 있는 사용자가 없습니다!`}</p>
        )
      )}
      {data.followings && data.followings.length > 0 && (
        <ScrollableBar itemClassname="flex flex-col items-center w-20">
          {data.followings.map(({ attributes }) => (
            <Link
              href={`user/${attributes.username}`}
              key={attributes.username}
            >
              <Avatar image={attributes.userimage} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {attributes.username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

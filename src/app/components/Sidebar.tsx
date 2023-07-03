"use client";
import Avatar from "./Avatar";
import useSWR from "swr";
import { ResponseUser } from "@/model/user";
import { BeatLoader } from "react-spinners";

export default function Sidebar() {
  const {
    data: user,
    isLoading: loading,
    error,
  } = useSWR<ResponseUser>("api/me");

  if (loading) {
    return <BeatLoader className="text-center mt-8 " />;
  }

  return (
    <>
      <div className="flex items-center">
        {user?.userimage && <Avatar image={user.userimage} />}
        <div className="ml-4">
          <p className="font-bold">{user?.displayname}</p>
          <p className="text-lg text-neutral-500 leading-4">{user?.realname}</p>
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

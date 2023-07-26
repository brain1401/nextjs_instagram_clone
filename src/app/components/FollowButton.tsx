"use client";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
type Props = {
  type: "follow" | "unfollow";
  userId: number;
};

export default function FollowButton({ type, userId }: Props) {
  const { toggleFollow } = useMe();
  const isFollow = type === "follow" ? true : false;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;
  const text = isFollow ? "팔로우" : "언팔로우";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(userId, isFollow);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <div className="relative">
        {isUpdating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PulseLoader size={6} />
          </div>
        )}
        <button
          disabled={isUpdating}
          onClick={handleFollow}
          className={`bg-rose-500 w-[5rem] h-[1.5rem] text-xs relative top-1 md:static md:w-[7rem] md:h-[1.7rem] md:text-[0.9rem] font-bold text-white rounded-md hover:bg-rose-600 ${
            isUpdating && "opacity-80"
          }`}
        >
          {text}
        </button>
      </div>
    </>
  );
}

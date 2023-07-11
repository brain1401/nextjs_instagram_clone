"use client";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { ResponsePost } from "@/model/post";
import useSWR from "swr";
import { ActionBarUser } from "@/model/user";
import { useState, useRef, useEffect } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import usePosts from "@/hooks/posts";
type Props = {
  post: ResponsePost;
};

export default function Actionbar({ post }: Props) {
  const { data: sessionUser } = useSWR<ActionBarUser>(
    "/api/getActionBarUser"
  );

  const liked = Boolean(post.likes.find(item => item.id === sessionUser?.id));

  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (sessionUser) {
      setLike(post, sessionUser, like);
 
    }
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <div className="flex gap-[0.3rem]">
          <ToggleButton
            toggled={liked}
            onToggle={() => handleLike(liked)}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <p className="text-[0.9rem] font-bold self-center">{`${
            post.likes?.length ?? 0
          }`}</p>
        </div>
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="m-3">
        {post.comments[0].comment && (
          <p className="mt-10 mb-8">
            <span className="font-bold mr-1">{post.author.displayname}</span>
            {post.comments[0].comment}
          </p>
        )}
        <p className="text-xs text-neutral-500 my-4">
          {parseDate(post.createdAt)}
        </p>
      </div>
    </>
  );
}

"use client";
import GridSpinner from "./ui/icons/GridSpinner";
import PostGridCard from "./PostGridCard";
import useTabPosts from "@/hooks/tabPosts";
import React from "react";
import { ResponsePost } from "@/model/post";
import { ActionBarUser, ResponseUser } from "@/model/user";

type Props = {
  displayname: string;
  query: string;
};

export type FunctionalMutateType = {
  postComment: (
    post: ResponsePost,
    user: ResponseUser,
    comment: string
  ) => void;
  setLike: (post: ResponsePost, user: ActionBarUser, like: boolean) => void;
};

export default function PostGrid({ displayname, query }: Props) {
  const { posts, isLoading, error, postComment, setLike } = useTabPosts(
    displayname,
    query
  );
  const mutates: FunctionalMutateType = { postComment, setLike };

  if (error || isLoading) {
    return <GridSpinner/>
  }
  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard
                post={post}
                priority={index < 6}
                mutates={mutates}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

"use client";
import useSWR from "swr";
import GridSpinner from "./ui/icons/GridSpinner";
import { ResponsePost } from "@/model/post";
import PostGridCard from "./PostGridCard";

type Props = {
  displayname: string;
  query: string;
};

export default function PostGrid({ displayname, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<ResponsePost[]>(`/api/users/${displayname}/${query}`);

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}

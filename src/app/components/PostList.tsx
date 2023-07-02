"use client";

import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/icons/GridSpinner";
import { ResponsePosts } from "@/model/post";

export default function PostList() {
  const { data: posts, isLoading: loading } = useSWR<ResponsePosts>("api/posts");
  
  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner color="red"/>
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.photo[0].url} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

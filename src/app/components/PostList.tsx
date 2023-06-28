"use client";

import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/icons/GridSpinner";
import { ResponsePosts } from "@/model/post";

export default function PostList() {
  const { data: posts, isLoading: loading } = useSWR<ResponsePosts>("api/posts");
  
  console.log("post 데이터 : ");
  console.log(posts);
  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner color="red"/>
        </div>
      )}
      {posts && (
        <ul>
          {posts.map(({attributes}, index) => (
            <li key={attributes.photo.data[0].attributes.url} className="mb-4">
              <PostListCard post={attributes} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

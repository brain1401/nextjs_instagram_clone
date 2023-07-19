"use client";
import GridSpinner from "./ui/icons/GridSpinner";
import PostGridCard from "./PostGridCard";
import useTabPosts from "@/hooks/tabPosts";
import React, { useState, useEffect } from "react";
import { ResponsePost } from "@/model/post";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import useMe from "@/hooks/me";
type Props = {
  displayname: string;
  query: string;
};

export default function PostGrid({ displayname, query }: Props) {
  const { user } = useMe();
  const [selectedPost, setSelectedPost] = useState<
    ResponsePost | null | undefined
  >(null);
  const { posts, isLoading, error, postComment, setLike, setBookmark } =
    useTabPosts(displayname, query);

  if (error || isLoading || !posts) {
    return <GridSpinner />;
  }
  const handlePostComment = (comment: string) => {
    user && selectedPost && postComment(selectedPost, setSelectedPost, user, comment);
  };

  const handleLike = (like: boolean) => {
    user && selectedPost && setLike(selectedPost, setSelectedPost, user, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user &&
      selectedPost &&
      setBookmark(selectedPost, setSelectedPost, user, bookmark);
  };

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id + "test"}>
              <PostGridCard
                post={post}
                priority={index < 6}
                setSelectedPost={setSelectedPost}
              />
            </li>
          ))}
      </ul>
      {selectedPost && (
        <ModalPortal>
          <PostModal onClose={() => setSelectedPost(null)}>
            <PostDetail
              post={selectedPost}
              handlePostComment={handlePostComment}
              handleLike={handleLike}
              handleBookmark={handleBookmark}
            />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}

"use client";
import { ResponsePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn } from "next-auth/react";
import { FunctionalMutateType } from "./PostGrid";
import useMe from "@/hooks/me";

type Props = {
  post: ResponsePost;
  priority: boolean;
  mutates: FunctionalMutateType;
};

export default function PostGridCard({
  post,
  priority = false,
  mutates,
}: Props) {
  const { user } = useMe();
  const [openModal, setOpenModal] = useState(false);
  const { photo, author } = post;
  const imageServerUrl = "https://brain1401.duckdns.org:1402/";
  const { postComment, setLike, setBookmark } = mutates;

  const handleOpenPost = () => {
    if (!user) {
      return signIn();
    }
    setOpenModal(true);
  };

  const handlePostComment = (comment: string) => {
    user && postComment(post, user, comment);
  };

  const handleLike = (like: boolean) => {
    user && setLike(post, user, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post, user, bookmark);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={imageServerUrl + photo[0].url}
        alt={`${author.displayname} 의 사진`}
        fill
        sizes="650px"
        priority={priority}
        className="object-cover"
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail
              post={post}
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

"use client";
import { ResponsePost } from "@/model/post";
import Image from "next/image";
import CommentForm from "./CommentForm";
import Actionbar from "./Actionbar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";

type Props = {
  post: ResponsePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { author, photo, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();
  const { user } = useMe();
  const handlePostComment = (comment: string) => {
    user && postComment(post, user, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar
        displayname={author.displayname}
        userimage={author.userimage}
      />
      <Image
        src={`https://brain1401.duckdns.org:1402/${photo[0].url}`}
        className="w-full object-cover aspect-square cursor-pointer"
        alt={`photo by ${author.displayname}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <Actionbar post={post}>
        {post.comments[0].comment && (
          <p className="mt-10 mb-8">
            <span className="font-bold mr-1">{post.author.displayname}</span>
            {post.comments[0].comment}
          </p>
        )}
        {comments.length > 1 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`총 ${comments.length}개의 댓글 보기`}</button>
        )}
      </Actionbar>
      <CommentForm onPostComment={handlePostComment} />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} handlePostComment={handlePostComment}/>
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}

'use client'
import { ResponsePost, ResponsePosts } from "@/model/post";
import Image from "next/image";
import CommentForm from "./CommentForm";
import Actionbar from "./Actionbar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import { KeyedMutator } from "swr";

type Props = {
  post: ResponsePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { author, comments, photo, createdAt, likes, id } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <Actionbar
        post={post}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}

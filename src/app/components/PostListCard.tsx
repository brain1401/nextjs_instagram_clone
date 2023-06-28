'use client'
import { ResponsePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import CommentForm from "./CommentForm";
import Actionbar from "./Actionbar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";

type Props = {
  post: ResponsePost['attributes'];
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const {author, comments , photo, createdAt, likes } = post;
  const [openModal, setOpenModal] = useState(false)

  const likesPeople = likes.data.map(data => data.attributes.displayname)
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar
          image={author.data.attributes.userimage}
          highlight
          size="medium"
        />
        <span className="text-gray-900 font-bold ml-2">
          {author.data.attributes.username}
        </span>
      </div>
      <Image
        src={`https://brain1401.duckdns.org:1402/${photo.data[0].attributes.url}`}
        className="w-full object-cover aspect-square cursor-pointer"
        alt={`photo by ${author.data.attributes.username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <Actionbar
        likes={likesPeople}
        username={author.data.attributes.username}
        text={comments.data[0].attributes.comment}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <p>포스트 상세 페이지</p>
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}

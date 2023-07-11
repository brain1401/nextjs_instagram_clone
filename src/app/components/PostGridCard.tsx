"use client";
import { ResponsePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";
import { KeyedMutator } from "swr";

type Props = {
  post: ResponsePost;
  priority: boolean;
};



export default function PostGridCard({ post, priority = false }: Props) {
  const {data: session} = useSession();
  const [openModal, setOpenModal] = useState(false);
  const { photo, author } = post;
  const imageServerUrl = 'https://brain1401.duckdns.org:1402/';

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={imageServerUrl+photo[0].url}
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
            <PostDetail post={post}/>
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}

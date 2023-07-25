"use client";
import { ResponsePost } from "@/model/post";
import Image from "next/image";
import { signIn } from "next-auth/react";
import useMe from "@/hooks/me";

type Props = {
  post: ResponsePost;
  priority: boolean;
  setSelectedPost: React.Dispatch<
    React.SetStateAction<ResponsePost | null | undefined>
  >;
};

export default function PostGridCard({
  post,
  priority = false,
  setSelectedPost,
}: Props) {
  const { user } = useMe();
  const imageServerUrl = "https://brain1401.duckdns.org:1402/";
  const { photo, author } = post;
  const handleOpenPost = () => {
    if (!user) {
      return signIn();
    }
    setSelectedPost(post);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={imageServerUrl + photo[0].url}
        alt={`${author.displayname} 의 사진`}
        fill
        sizes="650px"
        priority={priority}
        className="object-cover cursor-pointer"
        onClick={handleOpenPost}
      />
    </div>
  );
}

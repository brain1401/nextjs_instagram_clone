import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight size="medium" />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        src={image}
        className="w-full object-cover aspect-square"
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className="flex justify-between my-2 px-4">
        <div className="flex gap-[0.3rem]">
          <HeartIcon />
          <p className="text-[0.9rem] font-bold self-center">{`${
            likes?.length ?? 0
          }`}</p>
        </div>

        <BookmarkIcon />
      </div>
      <div className="m-3">
        <p className="mt-10 mb-8">
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 my-4">{parseDate(createdAt)}</p>
      </div>
      <form className="flex items-center border-t border-neutral-300">
        <div className="w-14 flex justify-center">
          <SmileIcon />
        </div>
        <input
          className="w-full border-none outline-none p-3"
          type="text"
          placeholder="댓글을 남겨주세요!"
        />
        <button className="font-bold text-sky-500 w-20 text-center">
          등록
        </button>
      </form>
    </article>
  );
}

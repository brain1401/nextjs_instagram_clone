import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";

type Props = {
  likes: string[],
  username: string;
  text: string;
  createdAt: string;
}
export default function Actionbar({likes, username, text, createdAt}: Props) {
  return (
    <>
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
    </>
  );
}
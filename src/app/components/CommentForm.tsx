`use client`;
import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-neutral-300"
    >
      <div className="w-14 flex justify-center">
        <SmileIcon />
      </div>
      <input
        className="w-full border-none outline-none p-3"
        type="text"
        placeholder="댓글을 남겨주세요!"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold text-sky-500 w-20 text-center ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        등록
      </button>
    </form>
  );
}

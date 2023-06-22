import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center border-t border-neutral-300">
      <div className="w-14 flex justify-center">
        <SmileIcon />
      </div>
      <input
        className="w-full border-none outline-none p-3"
        type="text"
        placeholder="댓글을 남겨주세요!"
      />
      <button className="font-bold text-sky-500 w-20 text-center">등록</button>
    </form>
  );
}
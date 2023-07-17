"use client";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { ResponsePost } from "@/model/post";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";
type Props = {
  post: ResponsePost;
  children?: React.ReactNode;
  onComment: (comment: string) => void;
};

export default function Actionbar({ post, children, onComment }: Props) {
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = Boolean(post.likes.find((item) => item.id === user?.id));
  const bookmarked = Boolean(
    user?.bookmarks.find((item) => item.id === post.id)
  );

  const handleLike = (like: boolean) => {
    user && setLike(post, user, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post.id, user, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment(comment);
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <div className="flex gap-[0.3rem]">
          <ToggleButton
            toggled={liked}
            onToggle={() => handleLike(liked)}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <p className="text-[0.9rem] font-bold self-center">{`${
            post.likes?.length ?? 0
          }`}</p>
        </div>
        <ToggleButton
          toggled={bookmarked}
          onToggle={() => handleBookmark(bookmarked)}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="m-3">
        {children}
        <p className="text-xs text-neutral-500 my-4">
          {parseDate(post.createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}

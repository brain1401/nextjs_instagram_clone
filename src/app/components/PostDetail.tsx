import { ResponsePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import Actionbar from "./Actionbar";
import Avatar from "./Avatar";
import { BeatLoader } from "react-spinners";
import useMe from "@/hooks/me";

type Props = {
  post: ResponsePost;
  handlePostComment: (comment: string) => void;
};

export default function PostDetail({ post, handlePostComment }: Props) {
  const imageServerUrl = "https://brain1401.duckdns.org:1402";
  const { user } = useMe();

  if (!post) {
    return <BeatLoader size={30} className="mt-32 text-center" />;
  }
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={imageServerUrl + post?.photo[0].url}
          alt={`${post.author.displayname} 이 만든 이미지`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar
          userimage={post.author.userimage}
          displayname={post.author.displayname}
        />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {post.comments &&
            post.comments.map(({ author: commentAuthor, comment }, index) => (
              <li
                key={commentAuthor.displayname}
                className="flex items-center mb-1"
              >
                <Avatar
                  image={commentAuthor.userimage}
                  size="small"
                  highlight={
                    commentAuthor.displayname === post.author.displayname
                  }
                />
                <div className="ml-2">
                  <span className="font-bold mr-1">
                    {commentAuthor.displayname}
                  </span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <Actionbar post={post} onComment={handlePostComment} />
      </div>
    </section>
  );
}

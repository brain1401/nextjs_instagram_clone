import { ResponsePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import Actionbar from "./Actionbar";
import Avatar from "./Avatar";
import { BeatLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";

type Props = {
  post: ResponsePost;
  handlePostComment: (comment: string) => void;
  handleLike?: (like: boolean) => void;
  handleBookmark?: (bookmark: boolean) => void;
};

export default function PostDetail({
  post,
  handlePostComment,
  handleLike,
  handleBookmark,
}: Props) {
  const imageServerUrl = "https://brain1401.duckdns.org:1402";
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  if (!post) {
    return <BeatLoader size={30} className="mt-32 text-center" />;
  }
  return (
    <section className="flex flex-col md:flex md:flex-row md:w-full md:h-full">
      {!isMobile ? ( // PC
        <>
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
          <div className="flex flex-col w-full basis-2/5">
            <PostUserAvatar
              userimage={post.author.userimage}
              displayname={post.author.displayname}
            />

            <ul className="h-full p-4 mb-1 overflow-y-auto border-t border-gray-200">
              {post.comments &&
                post.comments.map(
                  ({ author: commentAuthor, comment }, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <Avatar
                        image={commentAuthor.userimage}
                        size="small"
                        highlight={
                          commentAuthor.displayname === post.author.displayname
                        }
                      />
                      <div className="ml-2">
                        <span className="mr-1 font-bold">
                          {commentAuthor.displayname}
                        </span>
                        <span>{comment}</span>
                      </div>
                    </li>
                  )
                )}
            </ul>
            <Actionbar
              post={post}
              onComment={handlePostComment}
              handleLikeProps={handleLike}
              handleBookmarkProps={handleBookmark}
            />
          </div>
        </>
      ) : (
        // Mobile
        <>
          <div className="flex flex-col w-full">
            <PostUserAvatar
              userimage={post.author.userimage}
              displayname={post.author.displayname}
            />
            <div className="relative w-full h-[20rem]">
              <Image
                className="object-cover"
                src={imageServerUrl + post?.photo[0].url}
                alt={`${post.author.displayname} 이 만든 이미지`}
                priority
                fill
                sizes="650px"
              />
            </div>
          </div>
          <ul className="h-full p-4 mb-1 overflow-y-auto border-t border-gray-200">
            {post.comments &&
              post.comments.map(({ author: commentAuthor, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={commentAuthor.userimage}
                    size="small"
                    highlight={
                      commentAuthor.displayname === post.author.displayname
                    }
                  />
                  <div className="ml-2">
                    <span className="mr-1 font-bold">
                      {commentAuthor.displayname}
                    </span>
                    <span>{comment}</span>
                  </div>
                </li>
              ))}
          </ul>
          <Actionbar
            post={post}
            onComment={handlePostComment}
            handleLikeProps={handleLike}
            handleBookmarkProps={handleBookmark}
          />
        </>
      )}
    </section>
  );
}

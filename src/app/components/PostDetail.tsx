import { ResponsePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import Actionbar from "./Actionbar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import useSWR from "swr";
import { BeatLoader } from "react-spinners";

type Props = {
  post: ResponsePost;
};

export default function PostDetail({ post }: Props) {
  const { id } = post;
  const imageServerUrl = "https://brain1401.duckdns.org:1402";

  const { data } = useSWR<ResponsePost>(`/api/posts/${id}`);

  if (!data) {
    return <BeatLoader size={30} className="mt-32 text-center"/>
  }
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={imageServerUrl + data?.photo[0].url}
          alt={`${data.author.displayname} 이 만든 이미지`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar
          userimage={data.author.userimage}
          displayname={data.author.displayname}
        />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {data.comments &&
            data.comments.map(({ author: commentAuthor, comment }, index) => (
              <li key={commentAuthor.displayname} className="flex items-center mb-1">
                <Avatar
                  image={commentAuthor.userimage}
                  size="small"
                  highlight={
                    commentAuthor.displayname === data.author.displayname
                  }
                />
                <div className="ml-2">
                  <span className="font-bold mr-1">{commentAuthor.displayname}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <Actionbar
          likes={data.likes}
          displayname={data.author.displayname}
          createdAt={data.createdAt}
        />
        <CommentForm />
      </div>
    </section>
  );
}

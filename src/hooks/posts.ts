import { ResponsePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { ActionBarUser } from "@/model/user";

async function updateLike(postId: number) {
  return (await axios.put("/api/handleLikesButton", { postid: postId })).data
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate: postMutate,
  } = useSWR<ResponsePost[]>("/api/posts");

  const setLike = (post: ResponsePost, user: ActionBarUser, like: boolean) => {

    const newPost: ResponsePost = {
      ...post,
      likes: like
        ? post.likes.filter((item) => item.displayname !== user.displayname)
        : [...post.likes, { id: user.id, displayname: user.displayname }],
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    postMutate(updateLike(post.id), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike };
}

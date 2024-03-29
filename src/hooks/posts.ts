import { ResponsePost } from "@/model/post";
import useSWR from "swr";
import axios from "axios";
import {useCallback} from 'react';
import { ActionBarUser, ResponseUser } from "@/model/user";

async function updateLike(postId: number) {
  return (await axios.put("/api/handleLikesButton", { postid: postId })).data;
}

async function addComment(postId: number, comment: string) {
  return (
    await axios.post("/api/handleComment", {
      postId: postId,
      comment: comment,
    })
  ).data;
}

async function updateBookmarks(postId: number) {
  return (await axios.put("/api/handleBookmarksButton", { postid: postId }))
    .data;
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate: postMutate,
  } = useSWR<ResponsePost[]>("/api/posts");

  const setLike = useCallback((post: ResponsePost, user: ActionBarUser, like: boolean) => {
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
  },[posts, postMutate])

  const postComment = useCallback((
    post: ResponsePost,
    user: ResponseUser,
    comment: string
  ) => {
    const newPost: ResponsePost = {
      ...post,
      comments: [
        ...post.comments,
        {
          author: { id: user.id, displayname: user.displayname, userimage: user.userimage },
          comment: comment,
        },
      ],
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    postMutate(addComment(post.id, comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  }, [posts, postMutate]);

  const setBookmark = useCallback(
    (post: ResponsePost, user: ResponseUser, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = post.bookmarkUsers ?? [];
      const newPost = {
        ...post,
        bookmarkUsers: bookmark
          ? bookmarks.filter((item) => item.id !== user.id)
          : [
              ...bookmarks,
              {
                displayname: user.displayname,
                id: user.id,
              },
            ],
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      postMutate(updateBookmarks(post.id), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [postMutate, posts]
  );

  return { posts, isLoading, error, setLike, setBookmark, postComment };
}

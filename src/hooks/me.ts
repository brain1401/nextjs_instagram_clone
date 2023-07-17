import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";
import { ResponseUser } from "@/model/user";

async function updateBookmarks(postId: number) {
  return (await axios.put("/api/handleBookmarksButton", { postid: postId }))
    .data;
}

async function updateFollow(targetId: number, follow: boolean) {
  
  let data = null;
  if(follow === true){
    data = (await axios.put("/api/handleFollow", { userId: targetId })).data;
  }
  else if(follow === false){
    data = (await axios.put("/api/handleUnfollow", { userId: targetId })).data;
  }
  return data;
}


export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<ResponseUser>("/api/me");

  const setBookmark = useCallback(
    (postId: number, _user: ResponseUser, bookmark: boolean) => {
      if (!_user) return;
      const bookmarks = _user.bookmarks ?? [];
      const newUser = {
        ..._user,
        bookmarks: bookmark
          ? bookmarks.filter((item) => item.id !== postId)
          : [
              ...bookmarks,
              {
                author: { id: _user.id, displayname: _user.displayname },
                id: postId,
              },
            ],
      };

      mutate(updateBookmarks(postId), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate]
  );

  const toggleFollow = useCallback((targetId: number, follow: boolean) => {
    return mutate(updateFollow(targetId, follow), {populateCache: false})
  }, [mutate]) 
  return { user, isLoading, error, setBookmark, toggleFollow };
}

import useSWR from "swr";
import axios from "axios";
import { ResponseUser } from "@/model/user";

async function updateBookmarks(postId: number) {
  return (await axios.put("/api/handleBookmarksButton", { postid: postId }))
    .data;
}

export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<ResponseUser>("/api/me");

  const setBookmark = (
    postId: number,
    _user: ResponseUser,
    bookmark: boolean
  ) => {
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
  };
  return { user, isLoading, error, setBookmark };
}

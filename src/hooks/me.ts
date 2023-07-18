import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";
import { ResponseUser } from "@/model/user";


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


  const toggleFollow = useCallback((targetId: number, follow: boolean) => {
    return mutate(updateFollow(targetId, follow), {populateCache: false})
  }, [mutate]) 
  return { user, isLoading, error, toggleFollow };
}

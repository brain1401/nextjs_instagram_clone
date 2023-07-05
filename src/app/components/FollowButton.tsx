"use client";
type Props = {
  type: "follow"| "unfollow"
}
export default function FollowButton({type} : Props) {
  
  const text = type === "follow" ? "팔로우" : "언팔로우";

  return (
    <>
    <button className="bg-rose-500 w-[7rem] h-[1.7rem] text-[0.9rem] font-bold text-white rounded-md hover:bg-rose-600">{text}</button>
    </>
  )
}
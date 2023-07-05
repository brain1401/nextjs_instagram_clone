"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";
type Props = {
  user: ProfileUser;
};

const tabs = [
  {
    type: "posts",
    icon: <PostIcon />,
  },
  {
    type: "saved",
    icon: <BookmarkIcon className="w-3 h-3" />,
  },
  {
    type: "liked",
    icon: <HeartIcon className="w-3 h-3" />,
  },
];
export default function UserPosts({ user }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map((tab) => (
          <li
            className={`mx-12 p-4 cursor-pointer border-black ${
              tab.type === query && "font-bold border-t"
            }`}
            key={tab.type}
            onClick={() => setQuery(tab.type)}
          >
            <button>{tab.icon}</button>
            <span>{tab.type}</span>
          </li>
        ))}
      </ul>
      <PostGrid displayname={user.displayname} query={query} />
    </section>
  );
}

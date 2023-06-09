"use client";
import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import {usePathname} from 'next/navigation'
import PlusIcon from "./ui/icons/PlusIcon";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import useMe from "@/hooks/me";

const ICON_STYLE = "text-3xl hover:cursor-pointer";

const menu = [
  {
    href: "/",
    icon: <HomeIcon className={ICON_STYLE} isFill={false} />,
    clickedIcon: <HomeIcon className={ICON_STYLE} isFill />,
  },
  {
    href: "/search",
    icon: <SearchIcon className={ICON_STYLE} isFill={false} />,
    clickedIcon: <SearchIcon className={ICON_STYLE} isFill />,
  },
  {
    href: "/new",
    icon: <PlusIcon className={ICON_STYLE} isFill={false} />,
    clickedIcon: <PlusIcon className={ICON_STYLE} isFill />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
 const {
   user,
   isLoading: loading,
   error,
 } = useMe();

  return (
    <nav className="flex h-12 justify-between items-center">
      <Link href="/">
        <h1 className="font-bold text-3xl px-10">Instagram</h1>
      </Link>

      <ul className="flex items-center gap-6 mr-14 ">
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {pathname === item.href ? item.clickedIcon : item.icon}
            </Link>
          </li>
        ))}

        {user && (
          <li>
            <Link href={`/user/${user.displayname}`}>
              <Avatar image={user.userimage} size="small" highlight={true} />
            </Link>
          </li>
        )}
        <li>
          {session ? (
            <ColorButton onClick={() => signOut()} text="로그아웃" />
          ) : (
            <ColorButton onClick={() => signIn()} text="로그인" />
          )}
        </li>
      </ul>
    </nav>
  );
}

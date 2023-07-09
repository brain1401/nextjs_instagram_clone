import { Metadata } from "next";
import SearchUser from "../components/SearchUser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "유저 검색",
  description: "사용자 검색",
};

export default function Search() {
 
  return (
    <SearchUser/>
  )
}

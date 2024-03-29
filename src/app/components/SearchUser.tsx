"use client";
import { SearchUsers } from "@/model/user";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import useDebounce from "@/hooks/debounce";

export default function SearchUser() {
  const [input, setInput] = useState("");
  const deboundcedKeyword = useDebounce(input);

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUsers>(`/api/search/${deboundcedKeyword}`);

  return (
    <section className="text-center">
      <SearchBar state={input} setState={setInput} className="w-[80vw] md:w-[40rem] md:mb-5" />
      {isLoading && <BeatLoader className="mt-10" />}
      <ul className="text-start">
        {!isLoading &&
          users &&
          users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
      {!isLoading && !error && users && users.length === 0 && (
        <p className="text-xl font-bold">찾는 사용자가 없습니다!</p>
      )}
    </section>
  );
}

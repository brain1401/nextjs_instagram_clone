"use client";
import { ResponseUser, SearchUserType, SearchUsersType } from "@/model/user";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const { data: users, isLoading, error } = useSWR<SearchUsersType>("api/search");
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState<SearchUserType[]>([]);

  useEffect(() => {
    const newFilteredData = users && users.filter((user) => {
      if (user.displayname.includes(input) || user.realname.includes(input)) {
        return true;
      }
    })
    
    newFilteredData && setFilteredData(newFilteredData)
  }, [input, users]);

  return (
    <section>
      <SearchBar state={input} setState={setInput} />
      <ul>
        {isLoading && <BeatLoader className="text-center mt-10"/>}
        {!isLoading &&
          filteredData?.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}

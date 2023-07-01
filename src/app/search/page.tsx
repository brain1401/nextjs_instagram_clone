'use client'
import { ResponseUser } from "@/model/user";
import { useState, useEffect } from "react"
import { BeatLoader } from "react-spinners";
import useSWR from 'swr';
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";

export default function Search() {
  
  const {data : users, isLoading} = useSWR<ResponseUser[]>('api/users');
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("users 갱신됨!");
    console.log(users);
  },[users])

  
  return (
    <section>
     <SearchBar state={input} setState={setInput}/>
      <ul>
        {isLoading && <BeatLoader/>}
        {!isLoading &&
          users?.map((user) => (
            <li key={user.id}>
              <UserCard user={user}/>
            </li>
          ))}
      </ul>
    </section>
  );
}
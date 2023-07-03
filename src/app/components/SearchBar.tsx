"use client";

import { FormEvent } from "react";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

export default function SearchBar({state, setState, className}: Props) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className={`w-[50rem] h-[3rem] mt-10 border text-lg p-3 border-gray-400 ${className}`}
          type="text"
          autoFocus
          placeholder="유저를 검색하세요!"
          value={state}
          onChange={onChange}
        />
      </form>
    </>
  );
}
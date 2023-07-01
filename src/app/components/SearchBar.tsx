"use client";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>
};

export default function SearchBar({state, setState}: Props) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };


  return (
    <>
      <input
        className="w-[50rem] h-[3rem] mt-10 border border-gray-400"
        type="text"
        value={state}
        onChange={onChange}
      />
    </>
  );
}
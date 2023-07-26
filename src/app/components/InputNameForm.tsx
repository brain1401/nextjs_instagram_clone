"use client";
import { useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";

type Props = {
  type: "Displayname" | "Realname";
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputName: string
  setInputName: React.Dispatch<React.SetStateAction<string>>;
};

export default function InputNameForm({
  type,
  isValid,
  setIsValid,
  inputName,
  setInputName,
}: Props) {
  const text = type === "Displayname" ? "유저 이름" : "실명";
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFirstClicked, setIsFirstClicked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleCheckClick = async () => {
    setIsFirstClicked(true);
    setIsLoading(true);
    try {
      const response = await axios.get(`api/check${type}/${inputName}`);
      setIsValid(!response.data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setIsClicked(true);
  };

  return (
    <>
      <table className="m-2">
        <tbody>
          <tr>
            <td className="w-[5rem] text-right">
              <span className="text-sm md:text-base">{`${text}`}</span>
            </td>
            <td>
              <input
                className={`border ${
                  isClicked
                    ? isLoading
                      ? ""
                      : isValid
                      ? "border-cyan-400"
                      : "border-red-600"
                    : "border-gray-300"
                } rounded w-[10rem] md:w-[20rem] md:ml-3 md:mr-3 md:px-3 md:py-1 md:text-base`}
                type="text"
                value={inputName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button
                className="ml-3 border border-gray-400 rounded w-[4rem] md:ml-3 md:px-3 md:py-1 md:text-base"
                onClick={handleCheckClick}
              >
                검사
              </button>
            </td>
            <td>
              {isFirstClicked ? (
                isLoading ? (
                  <MoonLoader size={20} color="blue" />
                ) : isValid ? (
                  "☑️"
                ) : (
                  "⚠️"
                )
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

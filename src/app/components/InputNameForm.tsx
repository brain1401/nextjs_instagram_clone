"use client";
import { useState } from "react";
import axios from "axios";

type Props = {
  type: "Displayname" | "Realname";
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  inputName: string;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleCheckClick = async () => {
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
            <td className="w-[8rem] text-right">
              <span>{`사용할 ${text}`}</span>
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
                }`}
                type="text"
                value={inputName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button
                className="ml-3 w-[4rem] border border-gray-400 rounded"
                onClick={handleCheckClick}
              >
                검사
              </button>
            </td>
            <td>{isValid ? "☑️" : "⚠️"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

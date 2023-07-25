"use client";
import InputNameForm from "./InputNameForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function InputNameForms() {
  const [isDisplaynameValid, setIsDisplaynameValid] = useState(false);
  const [isRealnameValid, setIsRealnameValid] = useState(false);

  const [displayname, setdisplayname] = useState("");
  const [realname, setRealname] = useState("");

  useEffect(() => {
    setIsDisplaynameValid(false);
  }, [displayname]);

  useEffect(() => {
    setIsRealnameValid(false);
  }, [realname]);

  const router = useRouter();
  const onClick = () => {
    if (!isDisplaynameValid || !isRealnameValid) {
      alert("검사 버튼을 클릭해서 중복확인을 해 주세요!");
      return;
    }

    try {
      axios
        .post("/api/sendUserNamesByEmail", {
          displayname: displayname,
          realname: realname,
        })
        .then((res) => {
          const isSuccess = res.data;

          if (isSuccess) {
            router.push("/");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="mt-10" />
      <InputNameForm
        type="Displayname"
        isValid={isDisplaynameValid}
        setIsValid={setIsDisplaynameValid}
        inputName={displayname}
        setInputName={setdisplayname}
      />
      <InputNameForm
        type="Realname"
        isValid={isRealnameValid}
        setIsValid={setIsRealnameValid}
        inputName={realname}
        setInputName={setRealname}
      />
      <button
        className="w-full font-bold border rounded border-cyan-400"
        onClick={onClick}
      >
        제출
      </button>
    </section>
  );
}

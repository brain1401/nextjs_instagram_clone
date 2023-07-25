"use client";
import { ResponseUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import { useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/icons/GridSpinner";

type Props = {
  user: ResponseUser;
};

export default function NewPost({ user }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    try {
      const res = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data === false) {
        setError(`${res.status} ${res.statusText}`);
        return;
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data ?? err.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center w-full max-w-xl mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center bg-sky-500/20 pt-[30%]">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100">
          {error}
        </p>
      )}
      <PostUserAvatar
        displayname={user.displayname}
        userimage={user.userimage}
      />
      <form
        className="flex flex-col justify-center items-center mt-2 md:w-[30rem] md:items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`md:w-full md:h-60 h-[10rem] w-full mb-3 flex flex-col items-center justify-center ${
            !file && "border border-sky-500 border-dashed "
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 pointer-events-none bg-sky-500/20" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>이미지를 드래그 앤 드롭 하거나 클릭하세요</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="w-full text-lg border outline-none border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"코멘트를 작성하세요!"}
          ref={textRef}
        ></textarea>
        <div>
          <button
            className="w-[8rem] h-8 bg-blue-400 rounded-md text-white mt-3"
            onClick={() => {}}
          >
            게시
          </button>
        </div>
      </form>
    </section>
  );
}

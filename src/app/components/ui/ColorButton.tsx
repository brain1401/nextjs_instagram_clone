"use client";
type Props = {
  text: string;
  onClick: () => void;
  className?: string;
  size?: "small" | "big";
};

export default function ColorButton({
  text,
  onClick,
  size = "small",
  className,
}: Props) {
  return (
    <div
      className={`rounded-md border bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.1rem] w-fit
      ${size === "big" ? "p-[0.3rem]" : "p-[0.125rem]"}`}
    >
      <button
        className={`${className} bg-white text-xs font-bold md:text-center  md:rounded-sm md:px-3 md:hover:opacity-90 md:transition-opacity md:text-base md:w-fit
        ${size === "big" ? "p-4 text-2xl" : "p-[0.3rem] text-base"}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

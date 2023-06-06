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
      className={`rounded-md border bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.125rem]
      ${size === "big" ? "p-[0.3rem]" : "p-[0.125rem]"}`}
    >
      <button
        className={`${className} text-center text-base bg-white rounded-sm px-3 hover:opacity-90 transition-opacity
        ${size === 'big' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

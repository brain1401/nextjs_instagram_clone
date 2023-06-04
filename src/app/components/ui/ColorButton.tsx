type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

export default function ColorButton({ text, onClick, className }: Props) {
  return (
    <div className="rounded-md border bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.125rem]">
      <button
        className={`${className} text-center text-base bg-white rounded-sm p-1 px-3 hover:opacity-90 transition-opacity`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

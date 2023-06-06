export default function Avatar({image}: {image?: string | null}) {
  
  return (
    <div
      className={`rounded-full w-9 h-9 overflow-hidden border bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img className="rounded-full p-[0.1rem]" alt="user profile" src={image ?? undefined} referrerPolicy="no-referrer" />
    </div>
  );
}
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";

type Props = {
  className?: string;
  isFill: boolean;
};
export default function SearchIcon({ className, isFill }: Props) {
  return (
    <>
      {isFill ? (
        <RiSearchFill className={className} />
      ) : (
        <RiSearchLine className={className} />
      )}
    </>
  );
}

import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";

type Props = {
  className?: string;
  isFill: boolean;
};

export default function PlusIcon({className, isFill} : Props) {
  return (
    <>
      {isFill ? (
        <BsPlusSquareFill className={className} />
      ) : (
        <BsPlusSquare className={className} />
      )}
    </>
  );
}

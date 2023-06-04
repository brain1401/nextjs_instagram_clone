import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";


type Props = { 
  className?: string ;
  isFill: boolean;
};

export default function HomeIcon({className, isFill}: Props) {

 
  return (
    <>
      {isFill ? (
        <AiFillHome className={className} />
      ) : (
        <AiOutlineHome className={className} />
      )}
    </>
  );
}

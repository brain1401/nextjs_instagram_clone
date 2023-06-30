import Avatar from "./Avatar";

type Props = {
  userimage: string;
  displayname: string;
}

export default function PostUserAvatar({userimage, displayname}: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={userimage} highlight size="medium" />
      <span className="text-gray-900 font-bold ml-2">{displayname}</span>
    </div>
  );
}
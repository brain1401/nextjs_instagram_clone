import { ProfileUser, ResponseUser } from "@/model/user";
import FollowButton from "./FollowButton";
import Avatar from "./Avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/service/user";

type Props = {
  user: ProfileUser;
};

export default async function UserProfile({ user }: Props) {
  const session = await getServerSession(authOptions);
  const sessionUser =
    session?.user?.email && (await getUserByEmail(session.user.email));

    
  const renderButton = (
    sessionUser: "" | ResponseUser | null | undefined,
    user: ProfileUser
  ) => {
    if (sessionUser) {
      if (sessionUser.displayname !== user?.displayname) {
        return sessionUser.followings.find(
          (following) => following.displayname === user.displayname
        ) ? (
          <FollowButton type="unfollow" userId={user.id} />
        ) : (
          <FollowButton type="follow" userId={user.id} />
        );
      }
    }
  };

  return (
    <>
      <section className="flex justify-center w-full py-12 border-b border-neutral-300">
        <div className="flex items-center md:mt-10">
          <Avatar image={user?.userimage} size="xl" highlight />
          <div className="md:ml-8 md:w-[13rem] md:text-base md:px-0 px-5 w-[13rem] text-sm">
            <div className="flex justify-between w-full md:justify-normal md:gap-5">
              <h1 className="flex items-center justify-center text-xl ">{user?.displayname}</h1>
              {renderButton(sessionUser, user)}
            </div>
            <div className="flex justify-between my-2">
              <p>
                <span className="font-bold">{user.insta_posts.length}</span>
                포스트
              </p>
              <p>
                <span className="font-bold">{user?.followers.length}</span>
                팔로워
              </p>
              <p>
                <span className="font-bold">{user?.followings.length}</span>
                팔로잉
              </p>
            </div>
            <div>
              <p className="text-xl font-bold">{user.realname}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

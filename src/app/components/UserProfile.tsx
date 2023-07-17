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
      <section className="w-full flex justify-center border-b border-neutral-300 py-12">
        <div className="mt-10 flex items-center">
          <Avatar image={user?.userimage} size="xl" highlight />
          <div className="ml-8 w-[13rem] text-base">
            <div className="flex gap-5">
              <h1 className="text-xl">{user?.displayname}</h1>
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
              <p className="font-bold text-xl">{user.realname}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

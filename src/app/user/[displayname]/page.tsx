import UserPosts from "@/app/components/UserPosts";
import UserProfile from "@/app/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: { displayname: string };
};

const getUser = cache(async (displayname: string) =>
  getUserForProfile(displayname)
);

export default async function UserPage({ params }: Props) {
  const displayanme = params.displayname;
  const user = await getUser(displayanme);

  return (
    <>
      {user ? (
        <section className="w-full">
          <UserProfile user={user} />
          <UserPosts user={user} />
        </section>
      ) : (
        <p>
          유저{" "}
          <span className="font-bold">{`${decodeURIComponent(
            displayanme
          )}`}</span>
          은(는) 존재하지 않는 유저입니다.
        </p>
      )}
    </>
  );
}

export async function generateMetadata({
  params: { displayname },
}: Props): Promise<Metadata> {
  const user = await getUser(displayname);
  return {
    title: `${user.realname} (@${user.displayname}) · Instagram 사진`,
    description: `${user.realname}의 모든 Instagram 포스트`,
  };
}

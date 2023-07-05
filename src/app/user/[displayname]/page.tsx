import UserPosts from "@/app/components/UserPosts";
import UserProfile from "@/app/components/UserProfile";
import { getUserForProfile} from "@/service/user";

type Props = {
  params: { displayname: string };
};

export default async function UserPage({ params }: Props) {
  const displayanme = params.displayname;
  const user = await getUserForProfile(displayanme);

  return (
    <>
      {user ? (
        <section className="w-full">
          <UserProfile user={user} />
          <UserPosts user={user} />
        </section >
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

'use client';
import useSWR from 'swr';

import { client } from "@/service/sanity"
import Avatar from "./Avatar";
import { User, UserSchema } from "@/model/user";


export default function FollowingBar() {

  const {data, isLoading, error} = useSWR('api/test')

  console.log(data)

  return (
    <section>
      {/* <ul className="flex justify-center gap-8">
        {users.map((user) => (
          <li key={user._id}>
            <div className="flex flex-col justify-center items-center">
              <Avatar image={user.image} highlight />
              {user.name}
            </div>
          </li>
        ))}
      </ul> */}
    </section>
  );
}
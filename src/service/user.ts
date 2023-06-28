import axios from "axios";
import qs from "qs";
import { ResponseUsers,ResponseUser, UserData } from "@/model/user";
type OAuthUser = {
  id: string;
  email: string;
  displayname: string;
  username: string;
  image?: string | null;
};

export async function addUser({
  id,
  username,
  email,
  displayname,
  image,
}: OAuthUser) {
  // return client.createIfNotExists({
  //   _id: id,
  //   _type: "user",
  //   username: username,
  //   email: email,
  //   image: image,
  //   name: name,
  //   following: [],
  //   followers: [],
  //   bookmarks: [],
  // });
  const user = await getUserByUsername(username);

  console.log("user 데이터 : "+user);

  if (user.length === 0) {
    console.log("!user 블록이 실행됨")
    
    const data: UserData = {
      username: username,
      email: email,
      displayname: displayname,
      userimage: image,
    };

    console.log("등록할 userimage 타입 : "+typeof(data.userimage));

    const response = await axios.post<ResponseUser>(
      "https://brain1401.duckdns.org:1402/api/insta-users",
      {
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    );
  }
}

export async function getUserByUsername(username: string) {
  const query = qs.stringify({
    filters: {
      username: {
        $eq: username,
      },
    },
    populate: {
      followings: {
        fields: ["email", "username", "userimage", "displayname"],
      },
      followers: {
        fields: ["email", "username", "userimage", "displayname"],
      },
    },
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-users?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data:ResponseUsers = response.data.data;

  return data;
}

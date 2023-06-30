import { ResponseUser } from "@/model/user";
import axios from "axios";
import qs from "qs";
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
  const user = await getUserByUsername(username);

  if (!user) {
    const data = {
      username: username,
      email: email,
      displayname: displayname,
      userimage: image,
    };

    const response = await axios.post(
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

  return response.data.data[0] as ResponseUser;
}

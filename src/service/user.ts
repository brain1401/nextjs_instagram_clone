import { ResponseUser } from "@/model/user";
import axios from "axios";
import qs from "qs";
type OAuthUser = {
  id: string;
  email: string;
  displayname: string;
  image?: string | null;
};

export async function addUser({
  id,
  email,
  displayname,
  image,
}: OAuthUser) {
  const user = await getUserByEmail(email);

  console.log("Login 시 user데이터")
  console.log(user);
  if (!user) {
    const data = {
      session_id: id,
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

  if (!user.session_id) {
    console.log("!user.session 실행됨")
    const data = {
      session_id: id,
    };

    const response = await axios.put(
      `https://brain1401.duckdns.org:1402/api/insta-users/${user.id}`,
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

export async function getUserByEmail(email: string | null | undefined) {
  const query = qs.stringify({
    filters: {
      email: {
        $eq: email,
      },
    },
    populate: {
      followings: {
        fields: ["email", "realname", "userimage", "displayname"],
      },
      followers: {
        fields: ["email", "realname", "userimage", "displayname"],
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

export async function getUsers() {
  const query = qs.stringify({
    populate: "*",
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-users?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  return response.data.data as ResponseUser[]
}

// export function filterUsersByAnyName

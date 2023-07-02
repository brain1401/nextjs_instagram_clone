import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ResponseUser } from "@/model/user";
import axios from "axios";
import { getServerSession } from "next-auth";
import qs from "qs";
type OAuthUser = {
  id: string;
  email: string;
  image?: string | null;
};

export async function addUserOrValidateSessionIdIfUserDeosNotExist({
  id,
  email,
  image,
}: OAuthUser) {
  const user = await getUserByEmail(email);

  if (!user) {

    const data = {
      session_id: id,
      email: email,
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

    return true;
  } else if (!user.session_id) {
    console.log("!user.session 실행됨");
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

  return response.data.data as ResponseUser[];
}

export async function isNewUser(email: string) {
  const query = qs.stringify({
    filters: {
      email: {
        $eq: email,
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

  if (
    Boolean(response.data.data[0]?.displayname) === false ||
    Boolean(response.data.data[0]?.realname) === false
  ) {
    return true;
  } else {
    return false;
  }
}

export async function isExistDisplayname(displayname: string) {
  const query = qs.stringify({
    filters: {
      displayname: {
        $eq: displayname,
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
  return Boolean(response.data.data[0]?.displayname);
}

export async function isExistRealname(realname: string) {
  const query = qs.stringify({
    filters: {
      realname: {
        $eq: realname,
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

  return Boolean(response.data.data[0]?.realname);
}

export async function setUserNamesByEmail(
  displayname: string,
  realname: string,
  email: string
) {
  const user = await getUserByEmail(email);

  const data = {
    displayname: displayname,
    realname: realname,
  }
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

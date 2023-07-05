import { ResponseUser, ProfileUser } from "@/model/user";
import axios from "axios";
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

export async function getUserByEmail(email: string) {
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
  return response.data.data[0] as ResponseUser | null;
}

export async function getUsers() {
  const query = qs.stringify({
    filters: {
      displayname: {
        $notNull: true,
      },
      realname: {
        $notNull: true,
      },
    },
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
  };
  const response = user && await axios.put(
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

export async function searchUsers(keyword?: string) {
  const keywordQuery = keyword
    ? qs.stringify({
        fields: ["realname", "displayname", "userimage"],
        filters: {
          $or: [
            {
              realname: {
                $containsi: keyword,
              },
            },
            {
              displayname: {
                $containsi: keyword,
              },
            },
          ],
        },
        populate: {
          followings: {
            fields: ["displayname"],
          },
          followers: {
            fields: ["displayname"],
          },
        },
      })
    : qs.stringify({
        fields: ["realname", "displayname", "userimage"],
        filters: {
          displayname: {
            $notNull: true,
          },
          realname: {
            $notNull: true,
          },
        },
        populate: {
          followings: {
            fields: ["displayname"],
          },
          followers: {
            fields: ["displayname"],
          },
        },
      });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-users?${keywordQuery}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  const data = response.data.data.map((item: ResponseUser) => {
    return {
      ...item,
      followings: item.followings.length,
      followers: item.followers.length,
    };
  });

  return data as Omit<ResponseUser[], "followings" | "followers"> & {
    followings: number;
    followers: number;
  };
}

export async function getUserForProfile(displayname: string) {
  const query = qs.stringify({
    filters: {
      displayname: {
        $eq: displayname,
      },
    },
    populate: {
      followings: {
        fields: ["displayname"],
      },
      followers: {
        fields: ["displayname"],
      },
      insta_posts: {
        fields: ["id"]
      }

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

  return response.data.data[0] as ProfileUser;
}
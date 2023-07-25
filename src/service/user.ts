import { ResponseUser, ProfileUser, ActionBarUser } from "@/model/user";
import axios from "axios";
import qs from "qs";
type OAuthUser = {
  id: string;
  email: string;
  image?: string | null;
};

export async function addUserIfUserDeosNotExist({
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
  }
}

export async function getUserByEmail(email: string) {
  const query = qs.stringify({
    fields: [
      "displayname",
      "email",
      "createdAt",
      "id",
      "publushedAt",
      "realname",
      "userimage",
    ],
    filters: {
      email: {
        $eq: email,
      },
    },
    populate: {
      followings: {
        fields: ["realname", "userimage", "displayname"],
      },
      followers: {
        fields: ["realname", "userimage", "displayname"],
      },
      likePosts: {
        fields: ["id"],
        populate: {
          author: {
            fields: ["displayname", "id"],
          },
        },
      },
      bookmarks: {
        fields: ["id"],
        populate: {
          author: {
            fields: ["displayname", "id"],
          },
        },
      },
      insta_posts: {
        fields: ["id"],
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

export async function getUserById(id: number) {
  const query = qs.stringify({
    filters: {
      id: {
        $eq: id,
      },
    },
    populate: {
      followings: {
        fields: ["email", "realname", "userimage", "displayname"],
      },
      followers: {
        fields: ["email", "realname", "userimage", "displayname"],
      },
      likePosts: {
        fields: ["id"],
        populate: {
          author: {
            fields: ["displayname"],
          },
        },
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
  return response.data.data[0] as ActionBarUser;
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
  const isValiedDisplayname = await isExistDisplayname(displayname);
  const isValiedRealname = await isExistRealname(realname);

  if (isValiedDisplayname || isValiedRealname || !user)  {
    return false;
  }

  const data = {
    displayname: displayname,
    realname: realname,
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

  return response.statusText === "OK";
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
        fields: ["id"],
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

  return response.data.data[0] as ProfileUser;
}

export async function getActionBarUserByEmail(email: string) {
  const query = qs.stringify({
    filters: {
      email: {
        $eq: email,
      },
    },
    fields: ["displayname"],
    populate: {
      followings: {
        fields: ["displayname"],
      },
      followers: {
        fields: ["displayname"],
      },
      likePosts: {
        fields: ["id"],
        populate: {
          author: {
            fields: ["displayname"],
          },
        },
      },
      bookmarks: {
        fields: ["id"],
        populate: {
          author: {
            fields: ["displayname"],
          },
        },
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
  return response.data.data[0] as ActionBarUser;
}

export async function handleUnfollow(userId: number, sessionUserId: number) {
  const data = {
    followings: {
      disconnect: [userId],
    },
  };

  const response = await axios.put(
    `https://brain1401.duckdns.org:1402/api/insta-users/${sessionUserId}`,
    {
      data: data,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  return response.data;
}

export async function handleFollow(userId: number, sessionUserId: number) {
  const data = {
    followings: {
      connect: [userId],
    },
  };

  const response = await axios.put(
    `https://brain1401.duckdns.org:1402/api/insta-users/${sessionUserId}`,
    {
      data: data,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  return response.data;
}

import { ResponsePost, ResponsePosts } from "@/model/post";
import qs from "qs";
import axios from "axios";
import { ActionBarUser } from "@/model/user";

export async function getFollwingPostsByEmail(email: string) {
  const query = qs.stringify({
    filters: {
      author: {
        email: {
          $eq: email,
        },
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data: ResponsePost[] = response.data.data;

  return data;
}

export async function getPost(id: string) {
  const query = qs.stringify({
    filters: {
      id: {
        $eq: id,
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data: ResponsePosts = response.data.data;

  return data;
}

export async function getPostByDisplayname(displayname: string) {
  const query = qs.stringify({
    filters: {
      author: {
        displayname: {
          $eq: displayname,
        },
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
    sort: ["createdAt"],
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data = response.data.data;
  return data;
}

export async function getSavedPostByDisplayname(displayname: string) {
  const query = qs.stringify({
    filters: {
      bookmarkUsers: {
        displayname: {
          $eq: displayname,
        },
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
    sort: ["createdAt"],
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data = response.data.data;

  return data;
}

export async function getLikedPostByDisplayname(displayname: string) {
  const query = qs.stringify({
    filters: {
      likes: {
        displayname: {
          $eq: displayname,
        },
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
    sort: ["createdAt"],
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data = response.data.data;
  return data;
}

export async function getPostById(id: number) {
  const query = qs.stringify({
    filters: {
      author: {
        id: {
          $eq: id,
        },
      },
    },
    populate: {
      author: {
        fields: ["displayname", "userimage"],
      },
      likes: {
        fields: ["displayname"],
      },
      photo: {
        fields: ["url"],
      },
      comments: {
        fields: ["comment", "isPostFirstComment"],
        populate: {
          author: {
            fields: ["displayname", "userimage"],
          },
        },
      },
    },
    sort: ["createdAt"],
  });

  const response = await axios.get(
    `https://brain1401.duckdns.org:1402/api/insta-posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  const data = response.data.data;
  return data as ResponsePost;
}

export async function updateLikes(user: ActionBarUser, postId: number) {
  const isLiked = Boolean(user.likePosts.find((item) => item.id === postId));
  let result = null;

  if (isLiked) {
    console.log("이미 라이크 하고 있는 사용자로 인식");
    result = await axios.put(
      `https://brain1401.duckdns.org:1402/api/insta-users/${user.id}`,
      {
        data: {
          likePosts: {
            disconnect: [postId],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    );
  } else if (isLiked === false) {
    console.log("라이크 하고 있지 않는 사용자로 인식");
    result = await axios.put(
      `https://brain1401.duckdns.org:1402/api/insta-users/${user.id}`,
      {
        data: {
          likePosts: {
            connect: [postId],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    );
  } else {
    result = { data: "데이터가 없음" };
  }

  return result.statusText;
}

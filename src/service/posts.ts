import { ResponsePost, ResponsePosts } from "@/model/post";
import qs from "qs";
import axios from "axios";
import { ActionBarUser, ResponseUser } from "@/model/user";

export async function getPostsByEmail(email: string) {
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
        fields: ["displayname", "id"],
      },
      bookmarkUsers: {
        fields: ["displayname", "id"],
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

  data.forEach((item) => {
    delete item.updatedAt;
    delete item.publishedAt;
  });

  return data;
}

export async function getPostById(id: string) {
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
  data.forEach((item) => {
    delete item.updatedAt;
    delete item.publishedAt;
  });

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
      bookmarkUsers: {
        fields: ["id", "displayname"],
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
  const data: ResponsePost[] = response.data.data;
  data.forEach((item) => {
    delete item.updatedAt;
    delete item.publishedAt;
    delete item.createdAt;
  });
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
      bookmarkUsers: {
        fields: ["id", "displayname"],
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
  const data: ResponsePost[] = response.data.data;
  data.forEach((item) => {
    delete item.updatedAt;
    delete item.publishedAt;
    delete item.createdAt;
  });
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
      bookmarkUsers: {
        fields: ["id", "displayname"],
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
  const data: ResponsePost[] = response.data.data;
  data.forEach((item) => {
    delete item.updatedAt;
    delete item.publishedAt;
    delete item.createdAt;
  });
  return data;
}

export async function updateLikes(user: ResponseUser, postId: number) {
  const isLiked = Boolean(user.likePosts.find((item) => item.id === postId));
  let result = null;

  if (isLiked) {
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

export async function updateBookmarks(user: ActionBarUser, postId: number) {
  const isBookmarked = Boolean(
    user.bookmarks.find((item) => item.id === postId)
  );
  let result = null;

  if (isBookmarked) {
    result = await axios.put(
      `https://brain1401.duckdns.org:1402/api/insta-users/${user.id}`,
      {
        data: {
          bookmarks: {
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
  } else if (isBookmarked === false) {
    result = await axios.put(
      `https://brain1401.duckdns.org:1402/api/insta-users/${user.id}`,
      {
        data: {
          bookmarks: {
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

export async function addComment(
  userId: number,
  postId: number,
  comment: string
) {
  const result = await axios.post(
    `https://brain1401.duckdns.org:1402/api/insta-post-comments/`,
    {
      comment: comment,
      insta_post: {
        connect: [postId],
      },
      author: {
        connect: [userId],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );

  return result.statusText;
}

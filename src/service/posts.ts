import { ResponsePost, ResponsePosts } from "@/model/post";
import qs from "qs";
import axios, { AxiosError } from "axios";
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
    sort: ["createdAt:desc"], // 최신순
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
  postId: number | null,
  comment: string
) {
  if (postId === null) throw new Error("postId is null");

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

export async function createPost(userId: number, text: string, file: Blob) {
  let isSuccessful = true;
  let error = false;
  let newPostId: number | null = null;
  let newFormData = new FormData();

  try {
    // 포스트 생성
    const creationResponse = await axios.post(
      "https://brain1401.duckdns.org:1402/api/insta-posts",
      {
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
    newPostId = creationResponse.data.data.id;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.status);
      console.log("creation error");
    }
    error = true;
    isSuccessful = false;
  }

  try {
    // 위에서 생성한 포스트에사진 넣기
    newFormData = new FormData();
    newFormData.append("files", file);
    newFormData.append("ref", "api::insta-post.insta-post");
    newFormData.append("refId", newPostId?.toString() ?? "");
    newFormData.append("field", "photo");
    await axios.post(
      "https://brain1401.duckdns.org:1402/api/upload",
      newFormData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.status);
      console.log("upload error");
    }

    error = true;
    isSuccessful = false;

    try {
      await axios.delete(
        `https://brain1401.duckdns.org:1402/api/insta-posts/${newPostId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          },
        }
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.status);
        console.log("delete error");
      }
      error = true;
      isSuccessful = false;
    }
  }

  if (!error) await addComment(userId, newPostId, text);

  return isSuccessful;
}

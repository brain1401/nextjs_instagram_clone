import { ResponsePost, ResponsePosts } from "@/model/post";
import qs from "qs";
import axios from "axios";

export async function getFollwingPostsof(email: string) {
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
  const data: ResponsePost = response.data.data;

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

export async function getPostOf(displayname: string) {
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

export async function getSavedPostOf(displayname: string) {
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

export async function getLikedPostOf(displayname: string) {
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

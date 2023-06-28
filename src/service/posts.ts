import { ResponsePosts } from "@/model/post";
import qs from 'qs';
import axios from "axios";

export async function getFollwingPostsof(username: string) {
  const query = qs.stringify({
    filters: {
      author: {
        username: {
          $eq: username
        }
      },
    },
    populate: {
      author: {
        fields: ['username','userimage']
      },
      likes: {
        fields: ['displayname']
      },
      photo: {
        fields: ['url']
      },
      comments: {
        fields: ['comment']
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
  const data:ResponsePosts = response.data.data;

  return data;
}

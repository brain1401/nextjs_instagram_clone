import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email:string;
  name: string;
  username: string;
  image?: string | null;
}

export async function addUser({id, username, email, name, image}: OAuthUser) {
  return client.createIfNotExists({
  _id: id,
  _type: 'user',
  username: username,
  email: email,
  image : image,
  name: name,
  following: [],
  followers: [],
  bookmarks: []
  })
}
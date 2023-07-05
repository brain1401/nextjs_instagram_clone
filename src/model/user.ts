export type ResponseUser = {
  createdAt: string;
  displayname: string;
  email: string;
  followers: {
    displayname: string;
    email: string;
    id: number;
    userimage: string;
    realname: string;
  }[];
  followings: {
    displayname: string;
    email: string;
    id: number;
    userimage: string;
    realname: string;
  }[];
  id: number;
  publishedAt: string;
  updatedAt: string;
  userimage: string;
  realname: string;
  session_id: string;
};

export type ResponseUsers = {
  data: ResponseUser[],
}

export type SearchUsers = SearchUser[]


export type SearchUser = Omit<
  ResponseUser,
  "followings" | "followers"
> & { followings: number; followers: number };

export type ProfileUser = Omit<ResponseUser, "followings" | "followers"> & {
  followings: {
    id: number;
    displayname: string;
  }[];
  followers: {
    id: number;
    displayname: string;
  }[];
  insta_posts: {id:number;}[]
};
export type SessionUser = {
  name: string;
  username: string;
  email: string;
  image?: string;
};
export type ResponseUser = {
  id: number;
  attributes: {
    username: string;
    displayname: string;
    email: string;
    followings: {
      data: ResponeseFollowing[];
    };
    followers: {
      data: ResponseFollowers[];
    };
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    userimage: string;
  };
};

export type ResponseUsers = ResponseUser[];

export type ResponeseFollowing = {
  id: number;
  attributes: {
    email: string;
    username: string;
    userimage: string;
    displayname: string;
  };
};

export type ResponseFollowers = {
  id: number;
  attributes: {
    email: string;
    username: string;
    userimage: string;
    displayname: string;
  };
};




export type SimpleSessionUser = Pick<SessionUser, "username" | "image">;

export type UserData = {
  createdAt?: string;
  updatedAt?: string;
  displayname?: string;
  username?: string;
  userimage?: string | null;
  email?: string;
  followings?: ResponeseFollowing[] | undefined;
  followers?: ResponseFollowers[] | undefined;
};

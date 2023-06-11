export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type UserSchema = {
  username: string;
  bookmarks: [];
  image: string;
  _id: string;
  _updatedAt: string;
  email: string;
  name: string;
  followers: [];
  _createdAt: string;
  following: [];
  _rev: string;
  _type: string;
};
export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};


export type SimpleUser = Pick<User, 'username' | 'image'>

export type UserSchema = {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
  username: string;
  image: string;
  _id: string;
  _updatedAt: string;
  email: string;
  name: string;
  _createdAt: string;
  _rev: string;
  _type: string;
};
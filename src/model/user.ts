import { StringLiteral } from "typescript";

export type SessionUser = {
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export type SimpleSessionUser = Pick<SessionUser, "username" | "image">;

export type ResponseUser = {
  createdAt: string;
  displayname: string;
  email: string;
  followers: {
    displayname: string;
    email: string;
    id: number;
    userimage: string;
    username: string;
  }[];
  followings: {
    displayname: string;
    email: string;
    id: number;
    userimage: string;
    username: string;
  }[];
  id: number;
  publishedAt: string;
  updatedAt: string;
  userimage: string;
  username: string;
};
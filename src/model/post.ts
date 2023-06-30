export type Comment = {
  comment: string;
  username: string;
  image: string;
};

export type ResponsePost = {
  author: {
    id: number;
    userimage: string;
    displayname: string;
  };
  comments: {
    author: {
      id: number;
      displayname: string;
      userimage: string;
    };
    comment: string;
    isPostFirstComment: boolean;
  }[];
  createdAt: string;
  id: number;
  likes: {
    displayname: string;
    id: number;
  }[];
  photo: {
    id: number;
    url: string;
  }[];
  publishedAt: string;
  updatedAt: string;
};
export type ResponsePosts = ResponsePost[];

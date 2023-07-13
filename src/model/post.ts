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
  }[];
  createdAt: string;
  id: number;
  likes: {
    displayname: string;
    id: number;
  }[];
  bookmarkUsers: {
    id: number;
    displayname: string;
  }[];
  photo: {
    id: number;
    url: string;
  }[];
  publishedAt: string;
  updatedAt: string;
};
export type ResponsePosts = ResponsePost[];

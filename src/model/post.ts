export type Comment = {
  comment: string;
  username: string;
  image: string;
};

export type ResponsePost = {
  id: number;
  attributes: {
    author: {
      data: {
        id: string;
        attributes: {
          username: string;
          userimage: string;
        };
      };
    };
    comments: {
      data: {
        id: string;
        attributes: {
          comment: string;
        };
      }[];
    };
    createdAt: string;
    likes: {
      data: {
        attributes: {
          displayname: string;
        };
      }[];
    };
    photo: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
  };
};

export type ResponsePosts = ResponsePost[];

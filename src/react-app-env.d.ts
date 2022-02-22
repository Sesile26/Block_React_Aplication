/// <reference types="react-scripts" />

type State = {
  posts: Post[] | [],
  selectedPost: SelectedPost | null,
  update: boolean,
};

type Action = {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
};

type Post = {
  id: number,
  title: string,
  body: string,
};

type PostComment = {
  postId: number,
  body: string,
}

interface SelectedPost extends Post {
  comments: PostComment[],
}

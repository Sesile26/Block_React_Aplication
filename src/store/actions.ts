export const LOAD_POSTS = 'LOAD_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const RELOAD = 'RELOAD';

export const LoadPostsAction = (payload: Post[]) => ({
  type: LOAD_POSTS,
  payload,
});

export const LoadSelectedPostAction = (payload: SelectedPost | null) => ({
  type: SELECT_POST,
  payload,
});

export const Reload = () => ({
  type: RELOAD,
});

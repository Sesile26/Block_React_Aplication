import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../api/posts';
import { LoadPostsAction } from '../../store/actions';
import { getPostsSelector, updateSelector } from '../../store/selectors';
import './PostList.scss';

type Props = {
  getPostsDetails: (id: number) => void,
};

export const PostList: React.FC<Props> = ({ getPostsDetails }) => {
  const dispatch = useDispatch();
  const posts: Post[] = useSelector(getPostsSelector);
  const reload: boolean = useSelector(updateSelector);

  const getPostsFromApi = async () => {
    const postsFromServer = await getPosts();

    dispatch(LoadPostsAction(postsFromServer));
  };

  useEffect(() => {
    getPostsFromApi();
  }, [reload]);

  return (
    <ul className="postList">
      {posts.map(post => (
        <div key={post.id}>
          <li className="box postList__item">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button
              type="button"
              className="button is-info"
              onClick={() => getPostsDetails(post.id)}
            >
              Open post
            </button>
          </li>
        </div>
      ))}
    </ul>
  );
};

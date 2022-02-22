import React from 'react';
import { useDispatch } from 'react-redux';
import { getPostById } from './api/posts';
import './App.scss';
import { AddPostForm } from './components/AddPostForm/AddPostForm';
import { PostDetails } from './components/PostDetails/PostDetails';
import { PostList } from './components/PostList';
import { LoadSelectedPostAction } from './store/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const getPostsDetails = async (postId: number) => {
    const selectedPostFromServer = await getPostById(postId);

    dispatch(LoadSelectedPostAction(selectedPostFromServer));
  };

  return (
    <div className="App">
      <div className="columns">
        <div className="column">
          <PostList getPostsDetails={getPostsDetails} />
        </div>
        <div className="column">
          <PostDetails getPostsDetails={getPostsDetails} />
          <AddPostForm />
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment } from '../../api/comments';
import { deletePost, updatePost } from '../../api/posts';
import { LoadSelectedPostAction, Reload } from '../../store/actions';
import { getSelectedPostSelector } from '../../store/selectors';
import { AddNewComment } from '../AddNewComment';
import './PostDetails.scss';

type Props = {
  getPostsDetails: (id: number) => void,
};

export const PostDetails: React.FC<Props> = ({ getPostsDetails }) => {
  const dispatch = useDispatch();
  const selectedPost: SelectedPost | null = useSelector(getSelectedPostSelector);

  const [editForm, setEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState(selectedPost?.title);
  const [editBody, setEditBody] = useState(selectedPost?.body);

  const [isAddCommentsVisible, setAddCommentsVisible] = useState(false);

  const removePost = async () => {
    if (selectedPost?.id) {
      await deletePost(selectedPost.id);

      dispatch(LoadSelectedPostAction(null));
    }

    dispatch(Reload());
  };

  const addComment = async (body: string) => {
    if (selectedPost) {
      await addNewComment(selectedPost.id, body);
      dispatch(LoadSelectedPostAction({
        ...selectedPost,
        comments: [...selectedPost.comments, {
          postId: selectedPost.id,
          body,
        }],
      }));
    }

    dispatch(Reload());
  };

  const updatePostInfo = async () => {
    if (editTitle && editBody && selectedPost?.id) {
      await updatePost(editTitle, editBody, selectedPost?.id);
      setEditForm(false);

      getPostsDetails(selectedPost.id);
    }

    dispatch(Reload());
  };

  if (!selectedPost) {
    return (
      <div>
        <h2>Open some post for details</h2>
      </div>
    );
  }

  const openEditWindow = () => {
    setEditForm(!editForm);
    setEditTitle(selectedPost.title);
    setEditBody(selectedPost.body);
  };

  return (
    <div className="postDetails">
      {!editForm && (
        <>
          <h1 className="title">
            {selectedPost.title}
          </h1>
          <p className="postDetails__body">
            {selectedPost.body}
          </p>
        </>
      )}
      {editForm && (
        <>
          <input
            type="text"
            className="input PostForm__input"
            placeholder="Title"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />
          <textarea
            className="textarea PostForm__textarea"
            placeholder="Write here..."
            value={editBody}
            onChange={(event) => setEditBody(event.target.value)}
          />
          <button
            type="button"
            className="button is-success is-light"
            onClick={() => updatePostInfo()}
          >
            Save
          </button>
        </>
      )}
      <ul className="postDetails__comments">
        {selectedPost.comments.map((comment: PostComment) => (
          <li key={comment.body} className="box">{comment.body}</li>
        ))}
      </ul>
      {isAddCommentsVisible && <AddNewComment addComment={addComment} />}
      <div className="buttons">
        <button
          type="button"
          onClick={() => openEditWindow()}
          className="button is-warning"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => setAddCommentsVisible(!isAddCommentsVisible)}
          className="button is-primary"
        >
          Add Comment
        </button>

        <button
          type="button"
          onClick={() => removePost()}
          className="button is-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

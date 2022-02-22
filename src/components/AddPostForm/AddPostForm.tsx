import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../../api/posts';
import { Reload } from '../../store/actions';
import './AddPostForm.scss';

export const AddPostForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setTitle('');
    setBody('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (title && body) {
      await addNewPost(title, body);
      clearForm();
      dispatch(Reload());
    }
  };

  return (
    <form
      className="content postForm"
      onSubmit={handleSubmit}
    >
      <h2>Add new post</h2>
      <input
        type="text"
        className="input postForm__input"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        className="textarea PostForm__textarea"
        placeholder="Write here..."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <button
        type="submit"
        className="button is-primary PostForm__button"
      >
        Post
      </button>
    </form>
  );
};

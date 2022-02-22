import React, { useState } from 'react';
import './AddCommentForm.scss';

type Props = {
  addComment: (body: string) => Promise<void>,
};

export const AddCommentForm: React.FC<Props> = ({ addComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (comment) {
      addComment(comment);
      setComment('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="commentForm"
    >
      <input
        type="text"
        placeholder="Write something here"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="input is-info"
      />

      <button
        type="submit"
        className="button is-success"
      >
        Add comment
      </button>
    </form>
  );
};

import { API_URL } from './api';

export async function addNewComment(postId: number, body: string) {
  const newComment = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      postId,
      body,
    }),
  });

  return newComment.json();
}

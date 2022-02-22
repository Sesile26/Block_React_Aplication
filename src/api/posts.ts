import { API_URL } from './api';

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  return response.json();
}

export async function getPostById(postId: number) {
  const response = await fetch(`${API_URL}/posts/${postId}?_embed=comments`);

  return response.json();
}

export async function addNewPost(title: string, body: string) {
  const newPost = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 1000),
      title,
      body,
    }),
  });

  return newPost.json();
}

export async function deletePost(postId: number) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'DELETE',
  });

  return response.json();
}

export async function updatePost(title: string, body: string, postId: number) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: postId,
      title,
      body,
    }),
  });

  return response.json();
}

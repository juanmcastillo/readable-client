const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token){
    token = localStorage.token = Math.random().toString(36).substr(-8);
}
  
const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
};

/* Categories End Points */

export const getAllCategories = () =>
  fetch(`${api}/categories`, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { method: 'GET', headers })
    .then(res => res.json());

/* Posts End Points */

export const getAllPosts = (category) =>
    fetch(`${api}/posts`, { method: 'GET', headers })
      .then(res => res.json())
      .then(data => data);

export const getPostById = (postId) =>
    fetch(`${api}/posts/${postId}`, { method: 'GET', headers })
      .then(res => res.json());

export const createPost = (post) =>
    fetch(`${api}/posts`, 
          {
            method: 'POST',
            headers: {
                ...headers
            },
            body: JSON.stringify(post)
          })
    .then(res => res.json());

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, 
          {
            method: 'PUT',
            headers: {
                ...headers
            },
            body: JSON.stringify(post)
          })
    .then(res => res.json());

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, 
          {
            method: 'DELETE',
            headers: {
                ...headers
            }
          })
    .then(res => res.json());

export const voteOnPost = (post, option) =>
    fetch(`${api}/posts/${post.id}`, 
          {
            method: 'POST',
            headers: {
                ...headers
            },
            body: JSON.stringify({
                id: post.id,
                option
            })
          })
    .then(res => res.json());

export const getPostCommentsById = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { method: 'GET', headers })
      .then(res => res.json());

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
        .then(res => res.json());

export const createComment = (comment) =>
    fetch(`${api}/comments/`,
          { 
            method: 'POST',
            headers: {
                ...headers
            },
            body: JSON.stringify(comment)
        }).then(res => res.json());

export const voteOnComment = (comment, option) =>
    fetch(`${api}/comments/${comment.id}`, 
          {
            method: 'POST',
            headers: {
                ...headers
            },
            body: JSON.stringify({
                id: comment.id,
                option
            })
        }).then(res => res.json());

export const updateComment = (comment) =>
        fetch(`${api}/comments/${comment.id}`, 
              {
                method: 'PUT',
                headers: {
                    ...headers
                },
                body: JSON.stringify(comment)
              })
        .then(res => res.json());
    
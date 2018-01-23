const api = process.env.REACT_APP_READABLE_API_URL || 'http://10.0.0.8:3001';

let token = localStorage.token;

if (!token){
    token = localStorage.token = Math.random().toString(36).substr(-8);
}
  
const headers = {
  'Accept': 'application/json',
  'Authorization': token
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

export const createPost = (body) =>
    fetch(`${api}/posts`, 
          {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
    .then(res => res.json());

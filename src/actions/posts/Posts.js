import * as ActionTypes from '../ActionTypes';
import * as ReadableApi from '../../utils/ReadableApi';
import { showNotification } from '../general/General';

export const setPosts = (posts) => ({
    type: ActionTypes.SET_POSTS,
    posts
});

export const addSinglePost = (post) => ({
    type: ActionTypes.ADD_SINGLE_POST,
    post
});

export const refreshPost = (post) => ({
    type: ActionTypes.UPDATE_POST,
    post
});

export const removePost = (post) => (    {
    type: ActionTypes.DELETE_POST,
    post
});

export const getPostById = (postId) => (dispatch) => (
    ReadableApi.getPostById(postId)
               .then((post) => dispatch(addSinglePost(post)))
);

export const getPosts = (dispatch) => (
    ReadableApi.getAllPosts()
               .then((posts) => dispatch(setPosts(posts)))
);

export const addPost = (post) => (dispatch) => (
    ReadableApi.createPost(post)
               .then((savedPost) => {
                    dispatch(addSinglePost(savedPost));
                    dispatch(showNotification(true, "Post created successfully."));
               })
);

export const updatePost = (post) => (dispatch) => (
    ReadableApi.updatePost(post)
               .then((updatedPost) => {
                    dispatch(refreshPost(updatedPost));
                    dispatch(showNotification(true, "Post updated successfully."));
               })
);

export const deletePost = (post) => (dispatch) => (
    ReadableApi.deletePost(post.id)
               .then(() => {
                   dispatch(removePost(post));
                   dispatch(showNotification(true, "Post deleted successfully."));
                })
);

export const voteForPost = (post, option) => dispatch => (    
    ReadableApi.voteOnPost(post, option)
               .then((updatedPost) => {
                   dispatch(refreshPost(updatedPost));
               })
);
import * as ActionTypes from "./ActionTypes";
import * as ReadableApi from "../utils/ReadableApi";

export const setPosts = (posts) => ({
    type: ActionTypes.SET_POSTS,
    posts
});

export const getPosts = (dispatch) => (
    ReadableApi.getAllPosts()
               .then((posts) => dispatch(setPosts(posts)))
);
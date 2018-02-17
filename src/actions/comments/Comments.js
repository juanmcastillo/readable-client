import * as ActionTypes from '../ActionTypes';
import * as ReadableApi from '../../utils/ReadableApi';
import { showNotification } from '../general/General';

export const setComments = (postId, comments) => ({
    type: ActionTypes.SET_COMMENTS,
    comments,
    postId
});

export const getCommentsForPost = (postId) => (dispatch) => (
    ReadableApi.getPostCommentsById(postId)
               .then((comments) => dispatch(setComments(postId, comments)))
);

export const addSingleComment = (comment) => ({
    type: ActionTypes.ADD_SINGLE_COMMENT,
    comment
});

export const saveComment = (comment) => (dispatch) => (
    ReadableApi.createComment(comment)
               .then((savedComment) => {
                    dispatch(addSingleComment(savedComment));
                    dispatch(showNotification(true, "Comment created successfully."));
               })
);

export const removeComment = (comment) => ({
    type: ActionTypes.DELETE_COMMENT,
    comment
});

export const deleteComment = (comment) => (dispatch) => (
    ReadableApi.deleteComment(comment.id)
               .then(() => {
                    dispatch(removeComment(comment));
                    dispatch(showNotification(true, "Comment deleted successfully."));
               })
);

export const updateComment = (comment) => ({
    type: ActionTypes.UPDATE_COMMENT,
    comment
});

export const voteOnComment = (comment, option) => (dispatch) => (
    ReadableApi.voteOnComment(comment, option)
               .then((updatedComment) => dispatch(updateComment(updatedComment)))
);

export const sendCommentUpdate = (comment) => (dispatch) => (
    ReadableApi.updateComment(comment)
               .then((updatedComment) => dispatch(updateComment(updatedComment)))
);
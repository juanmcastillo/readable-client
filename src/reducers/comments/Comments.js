import * as ActionTypes from '../../actions/ActionTypes';
import _ from 'lodash';

const comments = (state = {}, action) => {
    const { comment } = action;

    switch (action.type) {

        case ActionTypes.SET_COMMENTS:
            const { postId, comments } = action;
            
            return {
                ...state,
                [postId]: comments
            };

        case ActionTypes.ADD_SINGLE_COMMENT:        
            return {
                ...state,
                [comment.parentId]: state[comment.parentId] ? _.reverse(state[comment.parentId].concat(comment)) : [comment]
            };

        case ActionTypes.DELETE_COMMENT:                    
            return {
                ...state,
                [comment.parentId]: state[comment.parentId].filter(c => c.id !== comment.id)
            };

        case ActionTypes.UPDATE_COMMENT:                    
            return {
                ...state,
                [comment.parentId]: state[comment.parentId].map(c => c.id === comment.id ? comment : c)
            };
        
        default:
            return state;
    }
}

export default comments;
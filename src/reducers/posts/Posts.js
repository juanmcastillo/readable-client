import * as ActionTypes from '../../actions/ActionTypes';

const posts = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            const { posts } = action;

            return {
                ...state,
                posts: posts.map(p => p)
            };

        default:
            return state;
    }
}

export default posts;
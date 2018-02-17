import * as ActionTypes from '../../actions/ActionTypes';

const posts = (state = {}, action) => {
    const {posts, post} = action;
    
    switch (action.type) {

        case ActionTypes.SET_POSTS:
            return {
                ...state,
                posts: posts.map(p=>p)
            };
        
        case ActionTypes.ADD_SINGLE_POST:
            return {
                ...state,
                posts: state.posts ? state.posts.concat([post]) : [post]
            };

        case ActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(p => p.id === post.id ? post : p)
            };
        case ActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== post.id)
            };
        default:
            return state;
    }
}

export default posts;
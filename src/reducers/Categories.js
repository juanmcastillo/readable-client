import * as ActionTypes from "../actions/ActionTypes";

export default function categories(state = {}, action){
    switch (action.type) {
        case ActionTypes.GET_CATEGORIES:
            const { categories } = action;

            return {
                ...state,
                categories
            };
    
        default:
            return state;
    }
}
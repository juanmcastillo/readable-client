import * as ActionTypes from '../../actions/ActionTypes';

const categories = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SET_CATEGORIES:
            const { categories } = action;

            return {
                ...state,
                categories
            };
        case ActionTypes.SELECT_CATEGORY:
            const { selectedCategory } = action;

            return {
                ...state,
                selectedCategory
            };
        default:
            return state;
    }
}

export default categories;
import * as ActionTypes from "./ActionTypes";
import * as ReadableApi from "../utils/ReadableApi";

export const setCategories = (categories) => ({
    type: ActionTypes.SET_CATEGORIES,
    categories
});

export const getCategories = (dispatch) => (
    ReadableApi.getAllCategories()
               .then((categories) => dispatch(setCategories(categories)))
);

export const selectCategory = (selectedCategory) => ({
    type: ActionTypes.SELECT_CATEGORY,
    selectedCategory
});
import * as ActionTypes from "./ActionTypes";
import * as ReadableApi from "../utils/ReadableApi";

export const getCategories = (categories) => ({
    type: ActionTypes.GET_CATEGORIES,
    categories
});
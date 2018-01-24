import { combineReducers } from 'redux';
import categories from './categories/Categories';
import posts from './posts/Posts';

export default combineReducers({
    categories,
    posts
});
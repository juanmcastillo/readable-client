import { combineReducers } from 'redux';
import categories from './categories/Categories';
import posts from './posts/Posts';
import general from './general/General';
import comments from './comments/Comments';

export default combineReducers({
    categories,
    posts,
    general,
    comments
});
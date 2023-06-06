import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import colorReducer from './colorReducer';
import newBlogReducer from './newBlogReducer';

const rootReducer = combineReducers({
  blog: blogReducer,
  filter: colorReducer,
  newBlog: newBlogReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

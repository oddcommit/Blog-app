import { NewBlogActionTypes, NEW_BLOG_ACTION } from '../_types/newBlogTypes';

export const newBlogAction = (payload: Object): NewBlogActionTypes => ({
  type: NEW_BLOG_ACTION,
  payload,
});
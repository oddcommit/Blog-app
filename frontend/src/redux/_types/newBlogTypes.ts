export interface newBlogState {
    newBlogVariable: Object;
  }
  
  export const NEW_BLOG_ACTION = 'NEW_BLOG_ACTION';
  
  interface NewBlogAction {
    type: typeof NEW_BLOG_ACTION;
    payload: Object;
  }
  
  export type NewBlogActionTypes = NewBlogAction;
  
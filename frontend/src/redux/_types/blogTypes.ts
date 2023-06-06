export interface BlogState {
    blogVariable: string;
  }
  
  export const BLOG_ACTION = 'BLOG_ACTION';
  
  interface BlogAction {
    type: typeof BLOG_ACTION;
    payload: string;
  }
  
  export type BlogActionTypes = BlogAction;
  
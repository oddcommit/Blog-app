import { NewBlogActionTypes, NEW_BLOG_ACTION } from '../_types/newBlogTypes';

interface NewBlogState {
  newBlogVariable: Object;
}

const initialState: NewBlogState = {
  newBlogVariable: {},
};

const newBlogReducer = (state = initialState, action: NewBlogActionTypes): NewBlogState => {
  switch (action.type) {
    case NEW_BLOG_ACTION:
      return {
        ...state,
        newBlogVariable: action.payload,
      };
    default:
      return state;
  }
};

export default newBlogReducer;

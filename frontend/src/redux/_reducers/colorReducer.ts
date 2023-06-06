import { ColorActionTypes, COLOR_ACTION } from "../_types/colorTypes";

interface ColorState {
  colorVariable: string;
}

const initialState: ColorState = {
  colorVariable: '',
};

const colorReducer = (state = initialState, action: ColorActionTypes): ColorState => {
  switch (action.type) {
    case COLOR_ACTION:
      return {
        ...state,
        colorVariable: action.payload,
      };
    default:
      return state;
  }
};

export default colorReducer;

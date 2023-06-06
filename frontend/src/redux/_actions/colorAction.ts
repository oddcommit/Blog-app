import { ColorActionTypes, COLOR_ACTION } from '../_types/colorTypes';

export const colorAction = (payload: string): ColorActionTypes => ({
  type: COLOR_ACTION,
  payload,
});
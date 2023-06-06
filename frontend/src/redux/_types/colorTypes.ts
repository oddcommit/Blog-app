export interface colorState {
  colorVariable: string;
}

export const COLOR_ACTION = 'COLOR_ACTION';

interface ColorAction {
  type: typeof COLOR_ACTION;
  payload: string;
}

export type ColorActionTypes = ColorAction;

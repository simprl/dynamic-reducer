import { SET_STATE } from './actionsTypes';

export const setState = (state: unknown) => ({
  type: SET_STATE,
  payload: state,
});

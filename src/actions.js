import { SET_STATE } from './actionsTypes';

export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});

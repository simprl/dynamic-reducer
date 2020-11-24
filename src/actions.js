import { ADD_REDUCER, REMOVE_REDUCER, SET_STATE } from './actionsTypes';

export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});

export const addReducer = (reducerName, name) => ({
  type: ADD_REDUCER,
  payload: { reducerName, name },
});

export const removeReducer = (name) => ({
  type: REMOVE_REDUCER,
  payload: name,
});

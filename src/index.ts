import createDynamicReducer, { Action } from './reducer';

export * as actions from './actions';
export * from './actionsTypes';

const reducer = createDynamicReducer;

export {
  reducer,
  createDynamicReducer,
  Action
};

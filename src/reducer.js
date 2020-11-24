import { ADD_REDUCER, REMOVE_REDUCER, SET_STATE } from './actionsTypes';

export default (reducers) => {
  const initState = { reducers: {} };
  const dynamicReducer = (state = initState, action) => {
    switch (action.type) {
      case SET_STATE:
        return action.payload;
      case ADD_REDUCER: {
        const { reducerName, name } = action.payload;
        const stateName = name ?? reducerName;
        const reducer = reducers[reducerName];
        if (!reducer) {
          throw new Error(`No reducer found: ${reducerName}`);
        }
        if (!state.reducers[stateName]) {
          return {
            ...state,
            [stateName]: reducer(undefined, action),
            reducers: { ...state.reducers, [stateName]: reducerName },
          };
        }
        return state;
      }
      case REMOVE_REDUCER: {
        const stateName = action.payload;
        if (state[stateName]) {
          const {
            [stateName]: del,
            reducers: { [stateName]: delReducer, ...otherReducers },
            ...newState
          } = state;
          return { ...newState, reducers: otherReducers };
        }
        return state;
      }
      default: {
        if (action.space) {
          const stateName = action.space;
          const reducerName = state.reducers[stateName];
          const reducer = reducers[reducerName];
          if (reducer) {
            const inState = state[stateName];
            const newInState = reducer(inState, action);
            if (inState !== newInState) {
              return { ...state, [stateName]: newInState };
            }
          }
        }
        return state;
      }
    }
  };

  return dynamicReducer;
};

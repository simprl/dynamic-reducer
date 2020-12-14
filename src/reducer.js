import { INIT, CLEAR, SET_STATE } from './actionsTypes';

const createDynamicReducer = () => {
  const reducers = {};

  const removeReducer = (space, reducer, dispatch) => {
    const pipe = reducers[space];
    if (pipe) {
      const newPipe = pipe.filter((item) => item !== reducer);

      if (newPipe.length > 0) {
        reducers[space] = newPipe;
      } else {
        delete reducers[space];
        dispatch({ space, type: CLEAR });
        return true;
      }
    }
    return false;
  };

  const addReducer = (space, reducer, dispatch) => {
    const pipe = reducers[space];
    if (pipe) {
      if (!pipe.includes(reducer)) {
        pipe.push(reducer);
        dispatch({ space, type: INIT });
      }
    } else {
      reducers[space] = [reducer];
      dispatch({ space, type: INIT });
    }
    return () => removeReducer(space, reducer, dispatch);
  };

  const initState = {};

  const reducer = (state = initState, action) => {
    switch (action.type) {
      case SET_STATE:
        return action.payload;
      case CLEAR: {
        const { [action.space]: delState, ...otherState } = state;
        return delState ? otherState : state;
      }
      default: {
        if (action.space) {
          const stateName = action.space;
          const reducersPipe = reducers[stateName];
          if (reducersPipe) {
            const inState = state[stateName];
            const newInState = reducersPipe.reduce(
              (itemState, itemReducer) => itemReducer(itemState, action),
              inState,
            );
            if (inState !== newInState) {
              return { ...state, [stateName]: newInState };
            }
          }
          return state;
        }
        return state;
      }
    }
  };
  return {
    reducer,
    addReducer,
  };
};

export default createDynamicReducer;

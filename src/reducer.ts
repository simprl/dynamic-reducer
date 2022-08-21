import { INIT, CLEAR, SET_STATE } from './actionsTypes';
import {Dispatch, Reducer} from 'redux';

export interface PipeItem {
  reducer: Reducer;
  count: number;
}
export interface Action<TPayload = unknown> {
  type: string;
  space: string;
  payload?: TPayload;
}
export type TState = Record<string, unknown>;

const createDynamicReducer = () => {
  const reducers: Record<string, PipeItem[]> = {};

  const removeReducer = (space: string, reducer: Reducer, dispatch: Dispatch) => {
    const pipe = reducers[space];
    if (pipe) {
      pipe.forEach((item) => {
        if (item.reducer === reducer) {
          // eslint-disable-next-line no-param-reassign,no-plusplus
          item.count--;
        }
      });
      const newPipe = pipe.filter(({ count }) => count > 0);

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

  const addReducer = (space: string, reducer: Reducer, dispatch: Dispatch) => {
    const pipe = reducers[space];
    if (pipe) {
      const reducerInPipe = pipe.find((item) => reducer === item.reducer);
      if (reducerInPipe) {
        // eslint-disable-next-line no-plusplus
        reducerInPipe.count++;
      } else {
        pipe.push({ reducer, count: 1 });
        dispatch({ space, type: INIT });
      }
    } else {
      reducers[space] = [{ reducer, count: 1 }];
      dispatch({ space, type: INIT });
    }
    return () => {
      removeReducer(space, reducer, dispatch);
    }
  };

  const initState: TState = {};

  const reducer: Reducer<TState, Action> = (state = initState, action) => {
    switch (action.type) {
      case SET_STATE:
        return action.payload as TState;
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
              (itemState, itemReducer) => itemReducer.reducer(itemState, action),
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

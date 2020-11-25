# dynamic-reducer

# Usage
Create store with dynamic reducer:
```js
import { createStore } from 'redux';
import { reducer as dynamicReducer } from '@simprl/dynamic-reducer';
import { reducer as entity } from './ducks/entity';
import { reducer as list } from './ducks/entity';

const reducer = dynamicReducer({
  entity,
  list,
})
const store = createStore(reducer)
```

Or add the dynamic reducer to the store with static reducers:
```js
import { createStore, combineReducers } from 'redux';
import { reducer as createDynamicReducer } from '@simprl/dynamic-reducer';
import { reducer as entity } from './ducks/entity';
import { reducer as list } from './ducks/entity';
import staticReducer1 from './ducks/staticReducer1';

const dynamicReducer = createDynamicReducer({
  entity,
  list,
})
const store = createStore(combineReducers({
  staticReducer1,
  dynamicReducer,
}))
```

You can write a React hook for control redux reducers:
```jsx
import { useEffect } from 'react';
import { actions as dynamicReducerActions } from '@simprl/dynamic-reducer';

const getUseReducer = ({ dispatch }) => (name, reducer) => useEffect(() => {
  dispatch(dynamicReducerActions.addReducer(name, reducer))
  return () => {
    dispatch(dynamicReducerActions.removeReducer(name ?? reducer))
  }
}, [ name, reducer ]);


const useReducer = getUseReducer(store);

const Component = () => {
    useReducer('books') // create reducer on mout and remove reducer on unmount
    return <button
        onClick={() => dispatch({ space: 'book', type: 'ADD_BOOK' })}
    >add book</button>
}




```

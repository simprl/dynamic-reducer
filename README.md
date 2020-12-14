# dynamic-reducer

# Usage
Create store with dynamic reducer:
```js
import { createStore } from 'redux';
import { reducer as dynamicReducer } from '@simprl/dynamic-reducer';
import { reducer as entity } from './ducks/entity';
import { reducer as list } from './ducks/entity';

const { reducer, addReducer } = dynamicReducer()
const store = createStore(reducer)
store.addReducer = addReducer
```

Or add the dynamic reducer to the store with static reducers:
```js
import { createStore, combineReducers } from 'redux';
import { reducer as createDynamicReducer } from '@simprl/dynamic-reducer';
import { reducer as entity } from './ducks/entity';
import { reducer as list } from './ducks/entity';
import staticReducer1 from './ducks/staticReducer1';

const { reducer: dynamicReducer, addReducer } = createDynamicReducer()
const store = createStore(combineReducers({
  staticReducer1,
  dynamicReducer,
}))
```

You can write a React hook for control redux reducers:
```jsx
import { useEffect } from 'react';
import { actions as dynamicReducerActions } from '@simprl/dynamic-reducer';

export const getUseReducer = ({ addReducer, dispatch }) => (name, reducer) => {
  useEffect(
    () => addReducer(name, reducer, dispatch),
    [ name, reducer ]
  );
}


const useReducer = getUseReducer(store);

const Component = () => {
    useReducer('books', booksReducer) // create reducer on mount and remove reducer on unmount
    return <button
        onClick={() => dispatch({ space: 'book', type: 'ADD_BOOK' })}
    >add book</button>
}

```

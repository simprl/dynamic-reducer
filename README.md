# Redux dynamic reducer
Add reducer to the store when component mount
and remove reducer from the store when component unmount

For more information read this article:
**[Put a Soul into a React-Redux Project](https://dev.to/simprl/adding-a-soul-into-a-react-redux-project-524b)**

## Usage
Example with **hook** **useReducer** :
```jsx
const Container = () => {
    const { dispatch, useReducer } = useStore()

    useReducer('books', booksReducer)

    return <button onClick={() => dispatch({ space: 'book', type: 'ADD_BOOK' })} >
        add book
    </button>
}
```
## Install
Modules 'react' and 'redux' should be installed.

Run NPM command:

npm i @simprl/dynamic-reducer

Or yarn:

yarn add @simprl/dynamic-reducer

## Setup
### 1.a. Create store with dynamic reducer:
```js
import { createStore } from 'redux';
import { reducer as dynamicReducer } from '@simprl/dynamic-reducer';

const { reducer, addReducer } = dynamicReducer()
const store = createStore(reducer)

const exStore = {
    ...store,
    useReducer: (name, reducer) => {
        useEffect(
            () => addReducer(name, reducer, store.dispatch),
            [ name, reducer ]
        );
    },
}
```
### 1.b. Attach to the static reducers:
If your project has static reducers, you can keep they
and add the dynamic reducer to the store with static reducers:
```js
import { createStore, combineReducers } from 'redux';
import { reducer as createDynamicReducer } from '@simprl/dynamic-reducer';
import reducer1 from './ducks/reducer1';
import reducer2 from './ducks/reducer2';

const { reducer: dynamic, addReducer } = createDynamicReducer()
const store = createStore(combineReducers({
    reducer1,
    reducer2,
    dynamic,
}))

const exStore = {
    ...store,
    useReducer: (name, reducer) => {
        useEffect(
            () => addReducer(name, reducer, store.dispatch),
            [ name, reducer ]
        );
    },
}
```

### 2. Set exStore to context provider
You can use Provider from 'react-redux' or create your own context
#### Use provider from 'react-redux'
```jsx
const App = () => {
    return <Provider store={exStore} >
        <Container />
    </Provider>
}
```
### 3. Take hook useReducer from hook useStore
```jsx
const { dispatch, useReducer } = useStore()
useReducer('books', booksReducer)
```


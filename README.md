# dynamic-reducer

# Usege
You can write hook for react for control redux reducers:
```jsx
const getUseReducer = ({ dispatch }) => (name, reducer) => useEffect(() => {
  dispatch(dynamicReducerActions.addReducer(name, reducer))
  return () => {
    dispatch(dynamicReducerActions.removeReducer(name ?? reducer))
  }
}, [name]);


const useReducer = getUseReducer(store);

const Component = () => {
    useReducer('books') // create reducer on mout and remove reducer on unmount
    return <button
        onClick={()=>dispatch({ space: 'book', type: 'ADD_BOOK' })}
    >add book</button>
}




```

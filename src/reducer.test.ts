import { createDynamicReducer } from './index';
import {createStore, Store, Reducer } from 'redux';

const reducer: Reducer<any, any> = (state = {}, action) =>
    (action.type === 'set') ? action.payload : state;

describe('createDynamicReducer', () => {
    let store: Store;
    let dyn: any;
    test('index contains createDynamicReducer', () => {
        expect(createDynamicReducer).toBeDefined();
        dyn = createDynamicReducer();
        expect(dyn).toBeDefined();
        expect(dyn).toHaveProperty('reducer');
        expect(dyn).toHaveProperty('addReducer');
    });

    test('createStore', () => {
        const { reducer, addReducer } = dyn;
        expect(reducer).toBeDefined();
        expect(addReducer).toBeDefined();
        store = createStore(reducer);
    });

    test('addReducer', () => {
        const { addReducer } = dyn;
        addReducer('reducer1', ()=>'zzz', store.dispatch)
    });

});

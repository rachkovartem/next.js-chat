import {compose, createStore} from 'redux';
import { reducer } from '../reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

let enhancer: any = '';

if (typeof window !== 'undefined') {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

    const store = createStore(reducer, enhancer);


export default store;
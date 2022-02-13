import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

// import thunk from 'redux-thunk';
import { globalReducer } from './controller';

const configureStore = (initialState?: any) => {
    const middlewares: any[] = [];
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    return createStore(globalReducer, initialState, enhancer);
};

const store: any = configureStore();

export default store;
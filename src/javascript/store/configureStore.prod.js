import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from "../reducers";

const enhancer = applyMiddleware(promiseMiddleware());

export default function configureStore(initiaState) {
    return createStore(rootReducer, initiaState, enhancer)
}

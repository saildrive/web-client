import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { autobahnMiddleware } from "../middleware/autobahn";
import rootReducer from "../reducers";

const enhancer = applyMiddleware(promiseMiddleware(), autobahnMiddleware);

export default function configureStore(initiaState) {
    return createStore(rootReducer, initiaState, enhancer)
}

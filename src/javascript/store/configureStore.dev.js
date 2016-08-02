import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import DevTools from '../containers/DevTools/DevTools';

const enhancer = compose(
    applyMiddleware(promiseMiddleware()),
    DevTools.instrument()
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
        );
    }

    return store;
}

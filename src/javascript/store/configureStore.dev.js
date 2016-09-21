import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import promiseMiddleware from "redux-promise-middleware";
import { autobahnMiddleware } from "../middleware/autobahn";
import { startStream, registerSubscriptions } from "../stream";
import DevTools from "../containers/DevTools/DevTools";

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(promiseMiddleware(), autobahnMiddleware()),
        DevTools.instrument()
    );

    const store = createStore(rootReducer, initialState, enhancer);

    startStream().then(session => {
        registerSubscriptions(session, store);
    });

    if (module.hot) {
        module.hot.accept("../reducers", () =>
            store.replaceReducer(require("../reducers")/*.default if you use Babel 6+ */)
        );
    }

    return store;
}

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import promiseMiddleware from "redux-promise-middleware";
import { autobahnMiddleware } from "../middleware/autobahn";
import DevTools from "../containers/DevTools/DevTools";

export default function configureStore(session, initialState) {
    const enhancer = compose(
        applyMiddleware(promiseMiddleware(), autobahnMiddleware(session)),
        DevTools.instrument()
    );

    const store = createStore(rootReducer, initialState, enhancer);

    session.subscribe('com.saildrive.update_light_success', function(e){
        store.dispatch({
            type: "UPDATE_LIGHT_FULFILLED",
            payload: e[0]
        });
    });

    if (module.hot) {
        module.hot.accept("../reducers", () =>
            store.replaceReducer(require("../reducers")/*.default if you use Babel 6+ */)
        );
    }

    return store;
}

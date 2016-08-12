import React from "react"
import { render } from "react-dom"
import { hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import Root from "./containers/Root/Root"
import configureStore from "./store/configureStore"
import { startStream } from "./stream.js";

startStream().then(session => {
    const store = configureStore(session);
    const history = syncHistoryWithStore(hashHistory, store);

    render(
        <Root store={store} history={history} />,
        document.getElementById("root")
    );
});

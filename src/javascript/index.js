import React from "react"
import { render } from "react-dom"
import { hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import Root from "./containers/Root/Root"
import configureStore from "./store/configureStore"
import startDatafeed from "./stream.js";

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
startDatafeed(store);

render(
    <Root store={store} history={history} />,
    document.getElementById("root")
);

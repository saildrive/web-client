import React, { Component, PropTypes } from "react"
import { Provider } from "react-redux"
import routes from "../../routes"
import DevTools from "../DevTools/DevTools"
import { Router } from "react-router"
import configureStore from "../../store/configureStore"
import { hashHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} />
                    <DevTools />
                </div>
            </Provider>
        )
    }
}

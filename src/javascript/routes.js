import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/App/App'
import Home from './containers/Home/Home'
import Lights from "./containers/Lights/Lights"

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/lights" component={Lights} />
    </Route>
)
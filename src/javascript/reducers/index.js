import { combineReducers } from "redux"
import lightsReducer from "./lights"
import navigationReduder from "./navigation";
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
    navigation: navigationReduder,
    lights: lightsReducer,
    routing
});

export default rootReducer;

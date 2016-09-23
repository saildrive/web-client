import { combineReducers } from "redux"
import lightsReducer from "./lights"
import navigationReduder from "./navigation";
import menuReducer from "./menu";
import applicationReducer from "./application";
import settingsReducer from "./settings";
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
    application: applicationReducer,
    settings: settingsReducer,
    menu: menuReducer,
    navigation: navigationReduder,
    lights: lightsReducer,
    routing
});

export default rootReducer;

import { CHANGE_SETTINGS } from "../constants";
import * as messages from "../constants/messages";
import _ from "lodash";



const initialState = {
    units: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS:
            return Object.assign({}, state, {

            });
        default:
            return state
    }
}
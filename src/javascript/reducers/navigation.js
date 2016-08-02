import { NAVIGATION_UPDATE, ENVIRONMENT_UPDATE } from "../constants"

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_UPDATE:
            return Object.assign({}, state, action.payload);
        case ENVIRONMENT_UPDATE:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}
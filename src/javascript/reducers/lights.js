import { GET_LIGHTS, UPDATE_LIGHT, CLEAR_NOTIFICATION } from "../constants"
import * as messages from "../constants/messages"
import _ from "lodash";

let notificationId = 0;

const initialState = {
    devices: [],
    notifications: [{
        type: "error",
        title: "Poop",
        description: "currently poopiung",
        id: 0
    }]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_NOTIFICATION":
            return Object.assign({}, state, {
                notifications: _.reject(state.notifications, notification => {
                    return notification.id === action.payload.id
                })
            });

        case `${GET_LIGHTS}_FULFILLED`:
            return Object.assign({}, state, {
                devices: action.payload.devices
            });

        case `${GET_LIGHTS}_REJECTED`:
            return Object.assign({}, state, {
                notifications: [ ...state.notifications, {
                    type: "error",
                    title: messages.GET_LIGHTS_ERROR.message,
                    description: _.get(action, "payload.args", [ ])[ 0 ],
                    id: ++notificationId
                }]
            });

        case `${UPDATE_LIGHT}_FULFILLED`:
            return Object.assign({}, state, {
                devices: state.devices.map((light, i) => {
                    if (light.id === action.payload.id) {
                        return Object.assign({}, light, action.payload)
                    }
                    return light;
                })
            });

        case `${UPDATE_LIGHT}_REJECTED`:
            return Object.assign({}, state, {
                notifications: [ ...state.notifications, action.payload]
            });

        default:
            return state
    }
}
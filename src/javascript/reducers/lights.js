import { GET_LIGHTS, UPDATE_LIGHT } from "../constants"

const initialState = {
    devices: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case `${GET_LIGHTS}_FULFILLED`:
            return Object.assign({}, state, {
                devices: action.payload.devices
            });

        case `${GET_LIGHTS}_REJECTED`:
            return Object.assign({}, state, {
                error: "error"
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

        default:
            return state
    }
}
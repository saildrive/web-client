import { GET_LIGHTS, SET_LIGHT } from "../constants"

const initialState = {
    devices: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case  `${GET_LIGHTS}_PENDING`:
            return Object.assign({}, state, {
            });

        case `${GET_LIGHTS}_FULFILLED`:
            return Object.assign({}, state, {
                devices: action.payload.devices
            });

        case `${GET_LIGHTS}_REJECTED`:
            return Object.assign({}, state, {
                error: "error"
            });

        case `${SET_LIGHT}_PENDING`:
            return Object.assign({}, state, {
                devices: state.devices.map((light, i) => {
                    if (light.id === action.meta.id) {
                        return Object.assign({}, light, {
                            dimmer: action.meta.params.dimmer
                        })
                    }
                    return light;
                })
            });

        default:
            return state
    }
}
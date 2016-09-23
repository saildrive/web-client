import { CHANGE_SETTING } from "../constants";


const initialState = {
    units: "metric"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SETTING:

            var setting = {
                [action.payload.setting]: action.payload.newValue
            };

            return Object.assign({}, state, setting);
        default:
            return state
    }
}

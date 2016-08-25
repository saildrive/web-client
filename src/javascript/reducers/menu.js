import { TOGGLE_MENU } from "../constants"

const initialState = {
    menuOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });
        default:
            return state
    }
}
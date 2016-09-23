import { TOGGLE_SETTINGS_MODAL, CHANGE_SETTING } from "../constants";

export function toggleSettingsModal() {
    return {
        type: TOGGLE_SETTINGS_MODAL
    }
}

export function changeSetting(opts) {
    return {
        type: CHANGE_SETTING,
        payload: opts
    }
}

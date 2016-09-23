import { APP_ONLINE, APP_OFFLINE, CONNECTION_REJECTED, TOGGLE_SETTINGS_MODAL } from "../constants";
import * as messages from "../constants/messages";
import _ from "lodash";

let notificationId = 0;

const initialState = {
    online: false,
    settingsModalOpen: false,
    notifications: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_ONLINE:
            return Object.assign({}, state, {
                online: true,
                notifications: _.filter(state.notifications, n => n.subtype !== "connection")
            });
        case APP_OFFLINE:
            return Object.assign({}, state, {
                online: false
            });
        case CONNECTION_REJECTED:
            let filteredNotifications = _.filter(state.notifications, n => n.subtype !== "connection");

            return Object.assign({}, state, {
                notifications: [ ...filteredNotifications, {
                    type: "error",
                    subtype: "connection",
                    title: messages.CONNECTION_ERROR.message,
                    description: `The connection was ${action.payload.reason}. Retrying in ${Math.ceil(action.payload.retry_delay)} seconds.`,
                    id: ++notificationId
                }]
            });
        case TOGGLE_SETTINGS_MODAL:
            return Object.assign({}, state, {
                settingsModalOpen: !state.settingsModalOpen
            });

        default:
            return state
    }
}

import checkHttpStatus from "../pureFunctions/checkHttpStatus";
import Promise from "bluebird";
import { GET_LIGHTS, UPDATE_LIGHT, CLEAR_NOTIFICATION } from "../constants";
import "whatwg-fetch";

export function getLights() {
    return {
        type: GET_LIGHTS,
        payload: {
            autobahnRPC: {
                path: "lights",
                method: "GET",
            }
        }
    }
}

export function updateLight(params) {
    const { id, data } = params;
    return {
        type: UPDATE_LIGHT,
        payload: {
            autobahnRPC: {
                type: "PUBLISH",
                id: id,
                path: `lights/${id}`,
                method: "UPDATE",
                data,
            }
        }
    }
}

export function clearNotification(id) {
    return {
        type: CLEAR_NOTIFICATION,
        payload: {
            id
        }
    }
}

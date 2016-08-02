import { NAVIGATION_UPDATE, ENVIRONMENT_UPDATE } from "../constants";

export function updateNavigation(payload) {
    return {
        type: NAVIGATION_UPDATE,
        payload: payload
    }
}

export function updateEnvironment(payload) {
    return {
        type: ENVIRONMENT_UPDATE,
        payload: payload
    }
}
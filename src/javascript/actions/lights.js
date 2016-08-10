import checkHttpStatus from "../pureFunctions/checkHttpStatus";
import { GET_LIGHTS, UPDATE_LIGHT } from "../constants";
import "whatwg-fetch";
import Promise from "bluebird";

export function getLights() {
    return {
        type: GET_LIGHTS,
        payload: {
            /* promise: fetch(
             "http://localhost/seadrive/lights"
             ).then(checkHttpStatus)*/
            promise: Promise.resolve({
                devices: [
                    {
                        id: "abc",
                        name: "V Berth",
                        description: "V Berth",
                        dimmer: 35
                    },
                    {
                        id: "mno",
                        name: "Head",
                        description: "V Berth",
                        dimmer: 0
                    },
                    {
                        id: "def",
                        name: "Main Cabin",
                        description: "V Berth",
                        dimmer: 100
                    },
                    {
                        id: "ghi",
                        name: "Galley",
                        description: "V Berth",
                        dimmer: 100
                    },
                    {
                        id: "jkl",
                        name: "Q Berth",
                        description: "V Berth",
                        dimmer: 0
                    },
                ]
            })
        }
    }
}

export function updateLight(params) {
    const { lightId, data } = params;
    return {
        type: UPDATE_LIGHT,
        payload: {
            autobahnRPC: {
                id: lightId,
                path: `lights/${lightId}`,
                method: "UPDATE",
                data,
            }
        }
    }
}

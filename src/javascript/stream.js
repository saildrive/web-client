import Promise from "bluebird";
import autobahn from './vendor/autobahn';
import * as messageTypes from "./constants/messageTypes";
import { APP_ONLINE, CONNECTION_REJECTED } from "./constants";

let store;
let qSession;

export const registerSubscriptions = (session, reduxStore) => {
    store = reduxStore;

    Object.keys(messageTypes).forEach(type => {
        session.subscribe(`com.saildrive.${type}`, rsp => {
            store.dispatch({
                type: type.toUpperCase(),
                payload: rsp[0]
            });
        })
    });
};

export const startStream = store => {
    qSession = new Promise(function(resolve, reject) {
        let connection = new autobahn.Connection({
            url: 'ws://127.0.0.1:8080/ws',
            realm: 'realm1'
        });

        connection.onopen = function (session) {
            store.dispatch({
                type: APP_ONLINE
            });
            resolve(session);
        };

        connection.onclose = function (reason, details) {
            store.dispatch({
                type: CONNECTION_REJECTED,
                payload: Object.assign(details, {reason: reason})
            });
        };

        connection.open();
    });

    return qSession;
};

export const call = (action, payload) => {
    qSession.then(session => {
        session.call(`com.saildrive.${action.toLowerCase()}`, payload)
            .then(rsp => {
                store.dispatch({
                    type: `${action}_FULFILLED`,
                    payload: rsp
                });
            })
            .catch(rsp => {
                store.dispatch({
                    type: `${action}_REJECTED`,
                    payload: rsp
                });
            });
        }
    )
};

export const publish = (action, payload) => {
    qSession.then(session => {
        session.publish(`com.saildrive.${action.toLowerCase()}`, payload)
    });
};


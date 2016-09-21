import { call, publish } from "../stream";

export const autobahnMiddleware = () => {
    return ({dispatch}) => {
        return (next) => (action) => {
            if (!action.payload || !action.payload.autobahnRPC) {
                return next(action)
            } else {
                dispatch({
                    type: `${action.type}_PENDING`,
                    payload: action.payload.autobahnRPC
                });

                if (action.payload.autobahnRPC && action.payload.autobahnRPC.type === "PUBLISH") {
                    publish(action.type, [action.payload.autobahnRPC])
                } else {
                    call(action.type, [action.payload.autobahnRPC]);
                }
            }
        }
    }
};

export const autobahnMiddleware = (session) => {
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
                    session.publish(`com.saildrive.${action.type.toLowerCase()}`, [action.payload.autobahnRPC])
                } else {
                    session.call(`com.saildrive.${action.type.toLowerCase()}`, [action.payload.autobahnRPC])
                        .then(rsp => {
                            dispatch({
                                type: `${action.type}_FULFILLED`,
                                payload: rsp
                            });
                        })
                        .catch(rsp => {
                            dispatch({
                                type: `${action.type}_REJECTED`,
                                payload: rsp
                            });
                        });
                }

            }
        }
    }
};

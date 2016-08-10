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

                session.call(`com.saildrive.${action.type.toLowerCase()}`, [action.payload.autobahnRPC]).then(
                    function (res) {
                        dispatch({
                            type: `${action.type}_FULFILLED`,
                            payload: res
                        });
                    }
                );
            }
        }
    }
};

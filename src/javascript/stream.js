import Promise from "bluebird";
import autobahn from './vendor/autobahn';

export const startStream = () => {
    return new Promise(function(resolve, reject) {
        let connection = new autobahn.Connection({
            url: 'ws://192.168.1.3:8080/ws',
            realm: 'realm1'
        });

        connection.onopen = function (session) {
            resolve(session);
        };

        connection.open();
    });



    /*
    datafeed.onmessage = (e) => {
        let data = JSON.parse(e.data);


        if (data.hasOwnProperty("updates")) {
            data.updates.forEach((values) => {
                values.values.forEach((value) => {
                    let slice = value.path.split(".")[0],
                        obj = createObjectFromDotNotation(value.path.split(".").slice(1).join(), value.value);

                    switch(slice) {
                        case "navigation":
                            store.dispatch(updateNavigation(obj));
                            break;
                        case "environment":
                            store.dispatch(updateEnvironment(obj));
                            break;
                    }
                })
            })
        }
    };*/
}

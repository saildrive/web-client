import { updateNavigation, updateEnvironment } from "./actions/stream";
import createObjectFromDotNotation from "./pureFunctions/objectFromDotNotation";

export default (store) => {
    let datafeed = new WebSocket(`ws://${window.location.hostname}:5000/signalk/v1/stream`);

    datafeed.onopen = () => {
        const subscriptionObject = {
            "context": "vessels.self",
            "subscribe": [{
                "path": "*"
            }]
        };
        const subscriptionMessage = JSON.stringify(subscriptionObject);
        datafeed.send(subscriptionMessage);
    };

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
    };
}

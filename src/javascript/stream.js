import { updateNavigation, updateEnvironment } from "./actions/stream";

export default (store) => {
    let datafeed = new WebSocket("ws://jaredr-mbp:5000/signalk/v1/stream?subscribe=self");

    datafeed.onmessage = (e) => {
        console.log(e.data)
        /*let parsed = JSON.parse(e.data);
        if (parsed.hasOwnProperty("updates")) {
            parsed.updates.forEach((values) => {
                values.values.forEach((value) => {
                    let slice = value.path.split(".")[0],
                        obj = createObject(value.path.split(".").slice(1).join(), value.value);
                    
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
        }*/
    };
}

function subscribe(ws) {
    ws.send({
        "context": "vessels.230099999",
        "subscribe": [
            {
                "path": "navigation.speedThroughWater",
                "period": 1000,
                "format": "delta",
                "policy": "ideal",
                "minPeriod": 200
            },
            {
                "path": "navigation.logTrip",
                "period": 10000
            }
        ],
        "unsubscribe": [
            {
                "path": "environment.depth.belowTransducer",
            }
        ]
    })
}

function createObject(dotNotation, val) {
    var settings = {};
    var levels = dotNotation.split(".");
    var curLevel = settings;
    var i = 0;

    while (i < levels.length-1) {
        if(typeof curLevel[levels[i]] === 'undefined') {
            curLevel[levels[i]] = {};
        }

        curLevel = curLevel[levels[i]];
        i++;
    }
    curLevel[levels[levels.length-1]] = val;

    return settings;
}
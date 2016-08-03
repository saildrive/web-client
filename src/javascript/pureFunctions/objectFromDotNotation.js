export default function createObjectFromDotNotation(dotNotation, val) {
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

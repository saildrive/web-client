require("./styles/compass.scss");

import React, { Component, PropTypes } from "react";
import {Motion, spring} from 'react-motion';
import ReactIgnore from "../../ReactIgnore/ReactIgnore";

let demarcation = 19;
let tallDemarcations = [1, 5, 7, 11, 13, 17];
let cardinals = [
    {
        left: 240,
        center: "W",
        right: 300
    },
    {
        left: 330,
        center: "N",
        right: 30
    },
    {
        left: 60,
        center: "E",
        right: 120
    },
    {
        left: 150,
        center: "S",
        right: 210
    },
    {
        left: 240,
        center: "W",
        right: 300
    }
];
let width = 300;
let height = 50;

export default class Compass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            position: 0
        }
    }

    render() {
        let { position } = this.state;

        return  (
            <div className="compass">
                <div className="compass__value">
                    <h2 className="compass__number">{position}°</h2>
                </div>
                <ReactIgnore >
                    <div className="compass__strip compass__strip--animated" ref={c => this._compass = c}/>
                </ReactIgnore>
                <div className="compass__center"></div>
            </div>
        )
    }

    componentDidMount() {
        this.compassStrip = makeCompassDisplay(this._compass);

        setInterval(() => {
            let change = Math.ceil(Math.random() * 30),
                previousDegrees = this.state.position,
                //newDegrees = this.state.position + change > 359 ? change : this.state.position + change;
                newDegrees = this.state.position - change < 1 ? 360 - change : this.state.position - change;

            this.setState({position: newDegrees});
            this.compassStrip.updatePosition(previousDegrees, newDegrees);
        }, 1000)

    }
}

function makeCompassDisplay(parent) {
    var $container = document.createDocumentFragment();

    for(var i = 0; i < cardinals.length; i++) {
        var $segment = document.createElement("canvas");
        $segment.classList.add("compass__segment");
        renderSegment($segment, i);
        $container.appendChild($segment)
    }

    parent.appendChild($container);

    return {
        updatePosition: function(previousDegrees, newDegrees) {
            let xPosn;

            let isTurningRight = false;

            if ( (((((previousDegrees - newDegrees) % 360) + 540) % 360) - 180) < 0 ) {
                isTurningRight = true;
            }


            if (previousDegrees < 270 && newDegrees > 269 && isTurningRight) {
                parent.classList.remove("compass__strip--animated");
                xPosn = -(((previousDegrees) / 360) * (width * 4) - (width * 3));
                parent.style.left = `${xPosn}px`;
                parent.offsetHeight;
                parent.classList.add("compass__strip--animated");
                let xPosnNew = -(((newDegrees) / 360) * (width * 4) - (width * 3));
                parent.style.left = `${xPosnNew}px`;
                return;
            }

            if (previousDegrees > 269 && newDegrees < 270 && !isTurningRight) {
                parent.classList.remove("compass__strip--animated");
                xPosn = -(((previousDegrees) / 360) * (width * 4) + width);
                parent.style.left = `${xPosn}px`;
                parent.offsetHeight;
                parent.classList.add("compass__strip--animated");
                let xPosnNew = -(((newDegrees) / 360) * (width * 4) + width);
                parent.style.left = `${xPosnNew}px`;
            }

            if (newDegrees > 269 && newDegrees < 360) {
                xPosn = -(((newDegrees) / 360) * (width * 4) - (width * 3));
                parent.style.left = `${xPosn}px`;
                return;
            }

            xPosn = -(((newDegrees) / 360) * (width * 4) + width);
            parent.style.left = `${xPosn}px`
        }
    }
}

function renderSegment(node, i) {
    const ctx = node.getContext('2d');

    ctx.strokeStyle = "#eeeeee";
    ctx.fillStyle = "#eeeeee";
    ctx.font = "16px Arial";
    ctx.lineWidth = 1;

    const leftStr = cardinals[i].left.toString();
    const rightStr = cardinals[i].right.toString();

    //draw the cardinals
    ctx.fillText(cardinals[i].center, (width * 0.5) - 5, 35);
    ctx.fillText(leftStr, width * (3/18) - (0.5 * (leftStr.length * 9)), 35);
    ctx.fillText(rightStr, width * (15/18) - (0.5 * (rightStr.length * 9)), 35);

    for(var j = 0; j < demarcation; j++) {
        let xPosn = (j * (width / (demarcation - 1)));
        let tickHeight = tallDemarcations.indexOf(j) > -1 ? 15 : 5;

        ctx.beginPath();
        ctx.moveTo(xPosn, height);
        ctx.lineTo(xPosn, height - tickHeight);
        ctx.stroke();
    }
}

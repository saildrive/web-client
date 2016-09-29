require("./styles/position.scss");

import React, { Component, PropTypes } from "react";
import _ from "lodash";

let currentPosition = {
    latitude: "40° 44' 23.87\" N",
    longitude: "74° 2' 31.74\" W"
};


export default class Position extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { latitude, longitude } = currentPosition;

        return  (
            <div className="position">
                <div className="position__value">
                    <h2 className="position__number">{latitude}</h2>
                    <h2 className="position__number">{longitude}</h2>
                </div>
            </div>
        )
    }
}

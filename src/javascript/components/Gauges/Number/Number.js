require("./styles/number.scss");

import React, { Component, PropTypes } from "react";

let state = {
    label: "SOG",
    value: "7.2",
    units: "kts"
};

export default class Position extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { value, units, label } = state;

        return  (
            <div className="number">
                <div className="number__wrapper">
                    <h2 className="number__label">{label}</h2>
                    <h2 className="number__value">{value}</h2>
                    <h2 className="number__units">{units}</h2>
                </div>
            </div>
        )
    }
}

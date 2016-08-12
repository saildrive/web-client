require("./styles/lightSlider.scss");
var BrightnessOffIcon = require("../../../images/brightness-off.svg");
var BrightnessOnIcon = require("../../../images/brightness-on.svg");

import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import ReactSlider from "react-slider";

export default class LightSlider extends Component {
    constructor(props) {
        super(props)
    }

    onChange(value) {
        let { id } = this.props;

        this.props.onChange({
            id: id,
            data: {
                dimmer: value
            }
        });
    }

    render() {
        const { name, dimmer } = this.props;

        let containerClass = classNames({
            "light-slider": true,
            "light-slider--powered": dimmer > 0
        });

        return (
            <div className={containerClass}>
                <p className="device-name">{name}</p>
                <BrightnessOffIcon className="brightness-icon brightness-icon--small"/>
                <ReactSlider
                    className="horizontal-slider"
                    withBars
                    step={5}
                    onChange={this.onChange.bind(this)}
                    defaultValue={dimmer}
                />
                <BrightnessOnIcon className="brightness-icon"/>
                <p className="device-dimmer">{`${dimmer || 0}%`}</p>
            </div>
        )
    }
}

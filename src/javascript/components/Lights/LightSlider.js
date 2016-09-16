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
        const { name, dimmer, maxWatts } = this.props;

        let containerClass = classNames({
            "light-slider": true,
            "light-slider--powered": dimmer > 0
        });

        return (
            <div className={containerClass}>
                <div className="light-slider__info">
                    <p className="light-slider__name">{name}</p>
                    <p className="light-slider__dimmer">{`${dimmer || 0}%`}</p>
                    <p className="light-slider__watts">{`${this.getWatts(dimmer, maxWatts)} watts`}</p>
                </div>
                <div className="light-slider__slider">
                    <BrightnessOffIcon className="brightness-icon brightness-icon--small"/>
                    <ReactSlider
                        className="horizontal-slider"
                        withBars
                        step={5}
                        onChange={this.onChange.bind(this)}
                        value={dimmer}
                    />
                    <BrightnessOnIcon className="brightness-icon"/>
                </div>
            </div>
        )
    }

    getWatts(dimmer, maxWatts) {
        let watts = (dimmer / 100) * (maxWatts);

        if (isNaN(watts)) {
            return "Error"
        } else {
            return Math.ceil(watts);
        }
    }
}

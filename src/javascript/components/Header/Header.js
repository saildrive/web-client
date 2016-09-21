require("./styles/header.scss");

import React, { Component, Proptype } from "react"

export default class Feedback extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props;

        return (
            <div className="header">
                <button className="slideout__button" onClick={this.slideToggle}>☰</button>
                <dl className="header-stats">
                    <div className="header-stat">
                        <dd className="stat-value">{navigation.speedOverGround && navigation.speedOverGround.toFixed(1)}kts</dd>
                        <dt className="stat-type">SOG</dt>
                    </div>
                    <div className="header-stat">
                        <dd className="stat-value">{navigation.courseOverGroundTrue && Math.round(navigation.courseOverGroundTrue)}°</dd>
                        <dt className="stat-type">COG</dt>
                    </div>
                </dl>
            </div>
        )
    }
}
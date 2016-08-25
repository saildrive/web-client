require("./styles/lights.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getLights, updateLight, clearNotification } from "../../actions/lights";
import Feedback from "../../components/Feedback/Feedback";
import Button from "../../components/Button/Button";
import LightSlider from "../../components/Lights/LightSlider";


class Lights extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { lights } = this.props;

        return (
            <div className="page lights-page">

                <Feedback {...this.props} />

                <div className="page-header">
                    <div className="info">
                        Watts: {this.calculateWattage(lights)}
                    </div>

                    <div className="actions">
                        <Button text="All On"
                            onClick={() => this.adjustAllLights(lights, 100)}
                            type="blue"
                            isDisabled={this.checkAllLights(lights, 100)}
                        />

                        <Button text="All Off"
                            onClick={() => this.adjustAllLights(lights, 0)}
                            type="blue"
                            isDisabled={this.checkAllLights(lights, 0)}
                        />
                    </div>
                </div>


                <div className="switches">
                    <div className="switches__header">
                        <p className="switches__title">Lighting Devices</p>
                    </div>

                    {this.renderNoLights(lights)}

                    { lights.map(light =>
                        <LightSlider
                            { ...light }
                            onChange={this.props.updateLight}
                            key={light.id}
                        />
                    ) }
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.props.getLights()
    }

    renderNoLights(lights) {
        if (!lights || !lights.length) {
            return (
                <div className="panel">No light fixtures found!</div>
            )
        }
    }

    checkAllLights(lights, dimmer){
        return _.every(lights, ["dimmer", dimmer])
    }

    adjustAllLights(lights, dimmer) {
        const { updateLight } = this.props;

        lights.forEach(light => {
            updateLight({
                id: light.id,
                data: {
                    dimmer: dimmer
                }
            })
        });
    }

    calculateWattage(lights) {
        let watts = 0;

        lights.forEach(light => {
            watts += (light.dimmer / 100) * (light.maxWatts)
        });

        return Math.ceil(watts);
    }
}

function mapStateToProps(state) {
    return {
        lights: state.lights.devices,
        notifications: state.lights.notifications
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLights: () => dispatch(getLights()),
        updateLight: params => dispatch(updateLight(params)),
        clearNotification: id => dispatch(clearNotification(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lights)

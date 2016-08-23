require("./styles/lights.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getLights, updateLight, clearNotification } from "../../actions/lights";
import Feedback from "../../components/Feedback/Feedback";
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

                {this.renderNoLights(lights)}

                <div className="switches">
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
                <div className="panel">No light fixtures found.</div>
            )
        }
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

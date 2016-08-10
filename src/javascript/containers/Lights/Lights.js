require("./styles/lights.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getLights, updateLight } from "../../actions/lights";
import LightSlider from "../../components/Lights/LightSlider";


class Lights extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { lights } = this.props;
        
        return (
            <div className="lights-container">
                { lights.devices.map(light =>
                    <LightSlider
                        { ...light }
                        onChange={this.props.updateLight}
                        key={light.id}
                    />
                ) }
            </div>
        )
    }

    componentWillMount() {
        this.props.getLights()
    }
}

function mapStateToProps(state) {
    return {
        lights: state.lights
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLights: () => dispatch(getLights()),
        updateLight: params => dispatch(updateLight(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lights)

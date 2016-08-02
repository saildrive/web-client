require("./styles/lights.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getLights, setLight } from "../../actions/lights";
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
                        onChange={this.props.setLight}
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
        setLight: (id, params) => dispatch(setLight(id, params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lights)

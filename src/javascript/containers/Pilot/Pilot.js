//require("./styles/lights.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Feedback from "../../components/Feedback/Feedback";
import Button from "../../components/Button/Button";

class Pilot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {  } = this.props;

        return (
            <div className="page lights-page">

                <Feedback {...this.props} />

                <div className="page-header">

                </div>

                <p>PILOT</p>

            </div>
        )
    }

    componentWillMount() {

    }


}

function mapStateToProps(state) {
    return {
        notifications: state.lights.notifications
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearNotification: id => dispatch(clearNotification(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pilot)

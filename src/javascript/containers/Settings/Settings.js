import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from "../../components/Modal/Modal";
import Button from  "../../components/Button/Button";
import { toggleSettingsModal } from "../../actions/settings";

class Lights extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, toggleSettingsModal } = this.props;

        return (
            <Modal isOpen={isOpen}
                title="Application Settings">
                <Button
                    onClick={toggleSettingsModal}
                    type="blue"
                    text="Close"
                />
            </Modal>
        )
    }

    componentWillMount() {

    }


}

function mapStateToProps(state) {
    return {
        isOpen: state.application.settingsModalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSettingsModal: () => dispatch(toggleSettingsModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lights)

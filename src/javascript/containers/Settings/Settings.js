require("./styles/settings.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from "../../components/Modal/Modal";
import Button from  "../../components/Button/Button";
import { toggleSettingsModal, changeSetting } from "../../actions/settings";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";

class Lights extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, toggleSettingsModal, units } = this.props;

        return (
            <Modal isOpen={isOpen}
                title="Application Settings">

                <div className="settings">
                    <div className="settings__option">
                        <span>Units:</span>
                        <ButtonGroup options={["metric", "imperial"]}
                                     onClick={this.onChangeUnits.bind(this)}
                                     active={units}
                                     color="blue"
                        />
                    </div>
                </div>
                <div className="close">
                    <Button
                        onClick={toggleSettingsModal}
                        type="blue"
                        text="Close"
                    />
                </div>
            </Modal>
        )
    }

    onChangeUnits(option) {
        let { changeSetting } = this.props;

        changeSetting({
            setting: "units",
            newValue: option
        });
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.application.settingsModalOpen,
        units: state.settings.units,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSettingsModal: () => dispatch(toggleSettingsModal()),
        changeSetting: opts => dispatch(changeSetting(opts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lights)

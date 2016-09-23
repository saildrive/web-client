require("./styles/menu.scss");
var CogIcon = require("../../../images/cogwheel.svg");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MenuItem from "../../components/MenuItem/MenuItem"
import Slideout from "slideout";
import { toggleSettingsModal } from "../../actions/settings";

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.slideout = new Slideout({
            'panel': document.getElementById('content'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70,
            'touch': false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuOpen) {
            this.slideout.open();
        } else {
            this.slideout.close();
        }
    }

    render() {
        const {
            location,
            lightsNotifications,
            toggleSettingsModal
        } = this.props;

        return (
            <nav className="menu" id="menu">
                <div className="menu__links">
                    <MenuItem route="/"
                              active={location.pathname}>
                        Dashboard
                    </MenuItem>
                    <MenuItem route="/lights"
                              active={location.pathname}
                              notifications={lightsNotifications}>
                        Lights
                    </MenuItem>
                </div>
                <div className="menu__dock">
                    <button className="button button--settings" onClick={toggleSettingsModal}>
                        <CogIcon className="gear-icon"/>
                    </button>
                </div>
            </nav>
        )
    }
}

Menu.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return {
        toggleSettingsModal: () => dispatch(toggleSettingsModal()),
    }
}


function mapStateToProps(state) {
    return {
        menuOpen: state.menu.menuOpen,
        lightsNotifications: state.lights.notifications,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
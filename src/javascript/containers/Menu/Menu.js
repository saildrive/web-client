require("./styles/menu.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MenuItem from "../../components/MenuItem/MenuItem"
import Slideout from "slideout";

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.slideout = new Slideout({
            'panel': document.getElementById('content'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
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
        const { location } = this.props;

        return (
            <nav className="menu" id="menu">
                <MenuItem route="/" active={location.pathname}>Dashboard</MenuItem>
                <MenuItem route="/lights" active={location.pathname}>Lights</MenuItem>
            </nav>
        )
    }
}

Menu.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
        menuOpen: state.menu.menuOpen
    }
}

export default connect(mapStateToProps)(Menu)
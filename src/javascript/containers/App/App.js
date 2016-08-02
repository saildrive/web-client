require("./styles/App.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import MenuItem from "../../components/MenuItem/MenuItem"
import Slideout from "slideout";

// Resets the currently visible error message.
export function resetErrorMessage() {
    return {
        type: "foo"
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDismissClick = this.handleDismissClick.bind(this);
        this.slideToggle = this.slideToggle.bind(this);
    }

    componentDidMount() {
        this.slideout = new Slideout({
            'panel': document.getElementById('content'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
        });
    }

    slideToggle(e) {
        this.slideout.toggle();
    }

    handleDismissClick(e) {
        this.props.resetErrorMessage();
        e.preventDefault()
    }

    handleChange(nextValue) {
        browserHistory.push(`/${nextValue}`)
    }

    renderErrorMessage() {
        const { errorMessage } = this.props;
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a>)
            </p>
        )
    }

    render() {
        const { children, location, navigation } = this.props;

        return (
            <div className="app">
                <nav className="menu" id="menu">
                    <MenuItem route="/" active={location.pathname}>Dashboard</MenuItem>
                    <MenuItem route="/lights" active={location.pathname}>Lights</MenuItem>
                </nav>
                <main className="content" id="content">
                    <div className="header">
                        <button onClick={this.slideToggle}>☰</button>
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
                        {this.renderErrorMessage()}
                    </div>
                    {children}
                </main>
            </div>
        )
    }
}

App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
    return {
        errorMessage: state.errorMessage,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, {
    resetErrorMessage
})(App)
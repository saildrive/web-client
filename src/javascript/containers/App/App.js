require("./styles/app.scss");

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { toggleMenu } from "../../actions/menu";
import Menu from "../Menu/Menu";
import Feedback from "../../components/Feedback/Feedback";
import Settings from "../Settings/Settings"
import Header from "../../components/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.slideToggle = this.slideToggle.bind(this);
    }

    slideToggle(e) {
        this.props.toggleMenu();
    }

    handleChange(nextValue) {
        browserHistory.push(`/${nextValue}`)
    }

    render() {
        const { children, location, navigation, application } = this.props;

        return (
            <div className="app">
                <Settings />
                <Menu location={location} />
                <main className="content" id="content">
                    <Header navigation={navigation} />
                    <Feedback {...application} />
                    {children}
                </main>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
    return {
        navigation: state.navigation,
        application: state.application,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch(toggleMenu()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
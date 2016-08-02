require("./styles/menuItem.scss");
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { route } = this.props;
        return (
            <div className={this.getClassName()}>
                <Link to={route}>{this.props.children}</Link>
            </div>
        )
    }
    
    getClassName() {
        let str = "menu-item";

        if (this.props.route === this.props.active) {
            str += " menu-item--active"    
        } 
        
        return str;
    }
}
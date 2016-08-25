require("./styles/menuItem.scss");
import React, { Component, PropTypes } from "react";
import _ from "lodash";
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
        const { notifications } = this.props;
        let str = "menu-item";

        if (this.props.route === this.props.active) {
            str += " menu-item--active"    
        }

        if (_.find(notifications, n => { return n.type === "error"; })) {
            str += " menu-item--notification-error"
        }
        
        return str;
    }
}
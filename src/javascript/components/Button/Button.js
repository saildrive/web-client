require("./styles/button.scss");

import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.getClassName = this.getClassName.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <button type="button"
                    className={this.getClassName()}
                    onClick={this.onClick}>
                {this.props.text}
            </button>
        );
    }


    onClick(e) {
        if (this.props.isDisabled) {
            return;
        }

        this.props.onClick(e);
    }

    getClassName() {
        var ret = `button button--${this.props.type}`;

        if (this.props.isDisabled) {
            ret += " button--disabled";
        }

        return ret;
    }
}

Button.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf([
        "text", "red", "blue", "green"
    ]),
    text: React.PropTypes.string.isRequired,
    isDisabled: React.PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => ({}),
    type: "primary",
    text: "",
    isDisabled: false,
};
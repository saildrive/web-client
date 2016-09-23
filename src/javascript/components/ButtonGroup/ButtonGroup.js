require("./styles/buttonGroup.scss");

import React from "react";

export default class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let { options } = this.props;

        return (
            <div className="button-group">
                { options.map((option, i) => this.renderOptions(option, i)) }
            </div>
        );
    }


    onClick(e) {
        this.props.onClick(e);
    }

    renderOptions(option, i) {
        return (
            <button className={this.getOptionClassName(option)}
                    onClick={this.onClick.bind(this, option)}
                    key={i}>
                {option}
            </button>
        )
    }

    getOptionClassName(option) {
        let { active, color } = this.props,
            ret = "button-group__option ";

        if (active.toUpperCase() === option.toUpperCase()) {
            ret += `button-group__option--active--${color}`;
        }

        return ret;
    }
}

ButtonGroup.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    color: React.PropTypes.oneOf([
        "red", "blue", "green"
    ]),
};

ButtonGroup.defaultProps = {
    onClick: () => ({}),
    color: "text",
};

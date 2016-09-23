require("./styles/modal.scss");

import React, { Component, PropTypes } from "react";
import ReactModal from "react-modal";

export default class Modal extends Component {
    render() {
        let { title, isOpen, className } = this.props;

        return (
            <ReactModal
                overlayClassName="modal__overlay"
                className={`modal__container ${className}`}
                isOpen={isOpen}
            >
                <h2 className="modal__header">{title}</h2>
                {this.props.children}
            </ReactModal>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
    title: "",
    isOpen: false,
    className: ""
};
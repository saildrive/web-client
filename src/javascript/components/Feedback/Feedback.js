require("./styles/feedback.scss");

import React, { Component, Proptype } from "react"

export default class Feedback extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { notifications } = this.props;

        let content = "";

        if (notifications) {
            content = notifications.map(notification => {
                return this.renderNotification(notification)
            })
        }

        return (
            <div className="notifications">
                {content}
            </div>
        )
    }

    renderNotification(props) {
        let { type, title, description, id } = props;

        return (
            <div className={`notifications__item notifications__item--${type}`} key={id}>
                <div className="notification__content">
                    <p className="notifications__title">{title}</p>
                    <p className="notifications__description">{description}</p>
                </div>
                <div className="notification__close">
                    <a className="close" onClick={this.handleDismiss.bind(this, id)} />
                </div>
            </div>
        )
    }

    handleDismiss(id) {
        let { clearNotification } = this.props;

        clearNotification(id)
    }

    componentWillReceiveProps(nextProps) {

    }
}
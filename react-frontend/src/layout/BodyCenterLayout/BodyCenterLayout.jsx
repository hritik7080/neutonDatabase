import React, { Component } from 'react'
import './BodyCenterLayout.css'

class BodyCenterLayout extends Component {
    render() {
        return (
            <div className="body-center-layout">
                {this.props.children}
            </div>
        )
    }
}

export default BodyCenterLayout

import React, { Component } from 'react'
import './BodySideLayout.css'
class BodySideLayout extends Component {
    render() {
        return (
            <div className="body-side-layout">
                {this.props.children}
            </div>
        )
    }
}

export default BodySideLayout

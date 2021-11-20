import React, { Component } from 'react'
import './ViewsBar.css'
class ViewsBar extends Component {
    render() {
        return (
            <div className="viewsbar-box">
                <img src="/media/images/eye-icon.svg" alt="views" height="14px" width="14px"/>
                <p>{this.props.views} views</p>
            </div>
        )
    }
}

export default ViewsBar

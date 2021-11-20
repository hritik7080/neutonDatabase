import React, { Component } from 'react'
import "./ApproveBar.css"
class ApproveBar extends Component {
    render() {
        return (
            <div className="approve-bar-box">
                <img width="12px" height="12px" src="/media/images/approved-icon.svg" alt="approved"/>
                <p>Approved by 15 experts</p>
            </div>
        )
    }
}

export default ApproveBar

import React, { Component } from 'react'

export class PastBar extends Component {
    render() {
        return (
            <div className="adp-past-box">
                <span className="adp-past-con">
                </span>
                <div className="adp-past-main">
                    <p>{this.props.data.sname}</p>
                    <button>Edit</button>
                    <button>Open</button>
                </div>
            </div>
        )
    }
}

export default PastBar

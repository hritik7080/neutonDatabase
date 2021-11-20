import React, { Component } from 'react'

export class FutureBar extends Component {
    render() {
        return (
            <div className="adp-future-box">
                <div className="adp-future-main">
                    <p>{this.props.data.sname}</p>
                    <button>Edit</button>
                    <button>Open</button>
                </div>
                <span className="adp-future-con">
                </span>
            </div>
        )
    }
}

export default FutureBar

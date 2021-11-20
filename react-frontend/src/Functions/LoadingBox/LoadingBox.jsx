import React, { Component } from 'react'
import './LoadingBox.css'
export class LoadingBox extends Component {
    render() {
        return (
            <div className="Loading-box">
                <img width="60px" height="60px" src="/media/images/black-loading.png" alt="loading"/>                
            </div>
        )
    }
}

export default LoadingBox

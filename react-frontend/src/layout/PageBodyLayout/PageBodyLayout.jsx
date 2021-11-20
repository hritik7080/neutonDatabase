import React, { Component } from 'react'
import './PageBodyLayout.css'
class PageBodyLayout extends Component {
    render() {
        return (
            <div className={`page-body-layout ${this.props.isColumnReversed? "column-reverse": ""}`}>
                {this.props.children}
            </div>
        )
    }
}

export default PageBodyLayout

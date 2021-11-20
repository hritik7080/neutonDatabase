import React, { Component } from 'react'
import './PageHeaderLayout.css'
class PageHeaderLayout extends Component {
    render() {
        return (
            <div className="page-header">
                {this.props.children}
            </div>
        )
    }
}
export default PageHeaderLayout

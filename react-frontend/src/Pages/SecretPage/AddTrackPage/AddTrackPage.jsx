import React, { Component } from 'react'
import './AddTrackPage.css'
import CreateNodeTrack from './CreateNodeTrack'
import CreateRootTrack from './CreateRootTrack'
class AddTrackPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            isRootCreated: false
        }
        this.handleRoot = this.handleRoot.bind(this)
    }
    handleRoot(data){
        this.setState({
            rootData: data,
            isRootCreated: true
        })
    }
    render() {
        return (
            <div className="sp-at-main">
                {!this.state.isRootCreated?
                    <CreateRootTrack handleRoot={this.handleRoot}/>
                :
                    <div className="sp-at-node">
                        <div className="sp-at-node-box">
                            <span>Root id: <b>AB1234</b></span>
                            <b>{this.state.rootData.title}</b>
                        </div>
                        <CreateNodeTrack />
                    </div>
                }
            </div>
        )
    }
}

export default AddTrackPage

import LikeTrackButton from '../../Buttons/LikeTrack/LikeTrackButton'
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./TrackBox.css"
import ViewsBar from '../../Functions/ViewsBar/ViewsBar'
export class TrackBox extends Component {
    constructor(props){
        super(props)
        this.state={
            likes: this.props.data.likes
        }
    }
    render() {
        return (
            <div className="tbc-main">
                <div className="tbc-head">
                    <p className="tbc-head-title"><b>{this.props.data.title}</b></p>
                    <div className="tbc-head-btns">
                        <LikeTrackButton trackId={this.props.data.selfId} likes={this.props.data.likes} />
                    </div>
                </div>
                <div className="tbc-body">
                    <div className="tbc-detail">
                        <p>{this.props.data.desc}</p>
                    </div>
                    <div className="tbc-button-box">
                        <div style={{flex: '1 1 auto'}}>
                            <ViewsBar views={this.props.data.views}/>
                        </div>
                        <Link to={"/track/"+this.props.data.selfId}>
                            <button>Open Track</button>
                        </Link>
                        <Link to={"/course/"+this.props.data.selfId}>
                            <button>Resoures</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrackBox

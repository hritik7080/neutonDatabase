import LikeTrackButton from '../../Buttons/LikeTrack/LikeTrackButton'
import ViewsBar from '../ViewsBar/ViewsBar'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./TrackBarDetail.css"

class TrackBarDetail extends Component {
    render() {
        return (
            <div className="track-bar-detail">
                <p>{this.props.data && this.props.data.desc}</p>
                <div className="track-bar-detail-btn">
                    <div className="track-bar-detail-info">
                        <ViewsBar views={this.props.data.views}/>
                        <LikeTrackButton trackId={this.props.data.selfId} likes={this.props.data.likes} />
                    </div>
                    <Link to={`/track/${this.props.data.selfId}`}>
                        <button>Open Track</button>
                    </Link>
                    <Link to={`/course/${this.props.data.selfId}`}>
                        <button>Resources</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default TrackBarDetail

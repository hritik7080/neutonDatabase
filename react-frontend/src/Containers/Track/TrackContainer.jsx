import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./TrackContainer.css"

import TrackBar from '../../Functions/TrackBar/TrackBar';
import PastBar from '../../Functions/PastBar/PastBar';
import FutureBar from '../../Functions/FutureBar/FutureBar';
import LikeTrackButton from '../../Buttons/LikeTrack/LikeTrackButton';
import ApproveBar from '../../Functions/ApproveBar/ApproveBar';
import ViewsBar from '../../Functions/ViewsBar/ViewsBar';

export class TrackContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            isPastOpen: false,
            isFutureOpen: false
        }
        this.handlePastTrack = this.handlePastTrack.bind(this)
        this.handleFutureTrack = this.handleFutureTrack.bind(this)
    }
    handlePastTrack(){
        this.setState({isPastOpen: !this.state.isPastOpen})
    }
    handleFutureTrack(){
        this.setState({isFutureOpen: !this.state.isFutureOpen})
    }
    render() {
        return (
            <div className="tc-main">
                {this.state.isPastOpen?
                    <div className="tc-past">
                    {this.props.data.juniors && this.props.data.juniors.map((item, index) => (
                        <PastBar key={index} data={item}/>
                    ))}
                    </div>
                :null}
                <div className="tc-present">
                    <div className="tc-present-head">
                        <p className="tc-present-head-title"><b>{this.props.data.title}</b></p>
                        <div className="tc-present-head-btns">
                            <LikeTrackButton trackId={this.props.data.selfId} likes={this.props.data.likes} />
                        </div>
                    </div>
                    <div className="tc-present-body">
                        <div className="tc-present-detail">
                            <p>{this.props.data.desc}</p>
                            <ApproveBar />
                        </div>
                        <div className="tc-button-box" style={{marginTop: this.props.data.juniors? "1rem": "0rem"}}>
                            {this.props.data.juniors?
                                <button onClick={this.handlePastTrack}>Early tracks</button>
                            :null
                            }
                            <ViewsBar views={this.props.data.views}/>
                            <Link to={"/course/"+this.props.data.selfId}>
                                <button>Resources</button>
                            </Link>
                        </div>
                    </div>
                </div>
                {console.log(this.props.data.nodes)}
                <div className="tc-child">
                    {this.props.data.nodes && this.props.data.nodes.map((item, index) => (
                        // <ChildBar key={index} data={item} cno={index} clen={this.state.clen} />
                        <TrackBar key={index} data={item} level={index}/>
                    ))}
                </div>
                <div onClick={this.handleFutureTrack} className="tc-at"><b>{this.props.data.seniors? this.props.data.seniors.length+' Advance tracks' : "The End"}</b></div>
                {this.state.isFutureOpen?
                    <div className="tc-future">
                        {this.props.data.seniors && this.props.data.seniors.map((item, index) => (
                            <FutureBar key={index} data={item}/>
                        ))}
                    </div>     
                :null}
                
            </div>
        )
    }
}

export default TrackContainer

import axios from 'axios'
import React, { Component } from 'react'

export class ChildBar extends Component {
    constructor(props){
        super(props)
        this.state={
            isClicked: false
        }
        this.handleExpand = this.handleExpand.bind(this)
    }
    async getChildTrack(){
        try {
            this.setState({childTrack: [], clen: 0,})
            const res = await axios.get(`/track/getChildTrack/${this.props.data.id}`)
            this.setState({childTrack: [...res.data.response], clen: res.data.response.length})
        } catch (error) {
            console.log(error);
        }
    }
    handleExpand(){
        this.getChildTrack()
        this.setState({isClicked: !this.state.isClicked})
    }
    render() {
        return (
            <div className="adp-child-box">
                <div className="adp-child-top">
                    <div className="adp-child-main">
                        {this.props.data.count !== "0"?
                            <span className={this.state.isClicked? "adp-child-main-1 adp-close" : "adp-child-main-1"}>
                                <img src={this.state.isClicked? "/images/track-minus.png": "/images/track-plus.png"} alt="plus"/>
                            </span>
                        :
                            null
                        }
                        <div className="adp-child-main-2">
                            <p onClick={this.handleExpand}>{this.props.data.sname}</p>
                            <button>A-C</button>
                            <button>Edit</button>
                            <button>DEL</button>
                            <button>A-S</button>
                        </div>
                    </div>
                </div>
                {this.state.isClicked?
                    <div className={this.props.cno === (this.props.clen-1)? "adp-child-bottom-true" : "adp-child-bottom-false"}>
                        {this.state.childTrack && this.state.childTrack.map((item, index) => (
                            <ChildBar key={index} data={item} cno={index} clen={this.state.clen}/>
                        ))}
                    </div>
                :
                    null
                }
            </div>
        )
    }
}

export default ChildBar

import React, { Component } from 'react'
import axios from 'axios'
import "./ChildBar.css"

class ChildBar extends Component {
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
            <div className="tcb-child-box">
                <div className="tcb-child-top">
                    <div onClick={this.handleExpand} className="tcb-child-main">
                        <div className="tcb-child-main-2">
                            <p>{this.props.data.sname}</p>
                        </div>
                        {this.props.data.count !== "0"?
                            <span className={this.state.isClicked? "tcb-child-main-1 tcb-close" : "tcb-child-main-1"}>
                                <img src={this.state.isClicked? "/media/images/track-minus.png": "/media/images/track-plus.png"} alt="plus"/>
                            </span>
                        :
                            null
                        }
                    </div>
                </div>
                {this.state.isClicked?
                    <div className={this.props.cno === (this.props.clen-1)? "tcb-child-bottom-true" : "tcb-child-bottom-false"}>
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

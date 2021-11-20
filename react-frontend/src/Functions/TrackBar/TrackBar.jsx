import axios from 'axios'
import React, { Component } from 'react'
import history from '../../utils/history'
import TrackBarDetail from '../TrackBarDetail/TrackBarDetail'
import "./TrackBar.css"

class TrackBar extends Component {
    constructor(props){
        super(props)
        this.state={
            isLiked: false,
            isChild: false,
            isClicked: false,
            likes: this.props.data.likes
        }
        this.handleLike = this.handleLike.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
        
        this.openTrack = this.openTrack.bind(this)
        this.openResource = this.openResource.bind(this)
    }
    componentDidMount(){
        if (this.props.data.nodes && this.props.data.nodes.length){
            this.setState({isChild: true})
        }
    }
    handleExpand(){
        this.setState({isClicked: !this.state.isClicked})
    }
    async handleLike(){
        this.setState({isLiked: true})
        try {
            await axios.get('/trackAction/',{params:{id: this.props.data.selfId, action: 'like', token: "token"}})
            this.setState({likes: this.state.likes + 1})
        } catch (error) {
           this.setState({isLiked: false})
        }
    }
    async handleDislike(){
        this.setState({isLiked: false})
        try {
            await axios.get('/trackAction/',{params:{id: this.props.data.selfId, action: 'dislike', token: "token"}})
            this.setState({likes: this.state.likes - 1})
        } catch (error) {
           this.setState({isLiked: true})
        }
    }
    openTrack(){
        history.push(`/track/${this.props.data.selfId}`)
    }
    openResource(){
        history.push(`/course/${this.props.data.selfId}`)
    }
    render() {
        return (
            <div className="tr-main">
                <div className={this.state.isClicked? "tr-top-active" : "tr-top"}>
                    <div onClick={this.handleExpand} className="tr-top-1">
                        <span></span>
                        <p>{this.props.data.title}</p>
                        {!this.state.isChild && <img id="tr-black-dot" height="20px" width="20px" src="/media/images/black-dot.png" alt="dot"/>}
                        {this.state.isClicked && this.state.isChild && <img className="tr-minus-icon" height="20px" width="20px" src="/media/images/red-minus.png" alt="minus"/>}
                        {!this.state.isClicked && this.state.isChild && <img height="20px" width="20px" src="/media/images/green-plus.svg" alt="plus"/>}
                    </div>
                    {this.state.isClicked? <TrackBarDetail data={this.props.data} />:null}
                    
                </div>
                {this.props.data && this.props.data.nodes && this.props.data.nodes.length && this.state.isClicked?
                    <div className="tr-bottom">
                        {this.props.data && this.props.data.nodes && this.props.data.nodes.map((item, index) => (
                            <TrackBar data = {item} key = {index} level={index}/>
                        ))} 
                    </div>
                :
                    null
                }
            </div>
        )
    }
}

export default TrackBar
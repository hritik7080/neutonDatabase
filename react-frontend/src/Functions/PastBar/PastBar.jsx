import axios from 'axios'
import React, { Component } from 'react'
import TrackBarDetail from '../TrackBarDetail/TrackBarDetail'
import "./PastBar.css"
class PastBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLiked: false,
            isBodyOpen: false,
            likes: this.props.data.likes
        }
        this.handleBody = this.handleBody.bind(this)
        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
    }
    handleBody(){
        this.setState({isBodyOpen: !this.state.isBodyOpen})
    }
    async handleLike(){
        this.setState({isLiked:true})
        try {
            await axios.get('/trackAction/',{params: {id: this.props.data.selfId, action: 'like'}})
            this.setState({likes: this.state.likes + 1})
        } catch (error) {
            this.setState({isLiked: false})
        }
    }
    async handleDislike(){
        this.setState({isLiked:false})
        try {
            await axios.get('/trackAction/',{params: {id: this.props.data.selfId, action: 'dislike'}})
            this.setState({likes: this.state.likes - 1})
        } catch (error) {
            this.setState({isLiked: true})
        }
    }
    render() {
        return (
            <div className="pastbar-main">
                <div className={this.state.isBodyOpen? "pastbar-box-active" : "pastbar-box"}>
                    <div className="pastbar-head" onClick={this.handleBody}>
                        <span></span>
                        <p>{this.props.data.title}</p>
                    </div>
                    {this.state.isBodyOpen?
                        <TrackBarDetail data={this.props.data} />
                    :null}
                </div>
            </div>
        )
    }
}

export default PastBar

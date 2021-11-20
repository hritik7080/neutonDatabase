import React, { Component } from 'react'
import axios from 'axios'
import './LikeTrackButton.css'
class LikeTrackButton extends Component {
    constructor(props){
        super(props)
        this.state={
            isLiked: false,
            isClicked: false,
            likes: this.props.likes
        }
        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
    }
    async handleLike(){
        this.setState({isLiked:true})
        try {
            await axios.get('/trackAction/',{params: {id: this.props.trackId, action: 'like'}})
            this.setState({likes: this.state.likes + 1})
        } catch (error) {
            this.setState({isLiked: false})
        }
    }
    async handleDislike(){
        this.setState({isLiked:false})
        try {
            await axios.get('/trackAction/',{params: {id: this.props.trackId, action: 'dislike'}})
            this.setState({likes: this.state.likes - 1})
        } catch (error) {
            this.setState({isLiked: true})
        }
    }
    render() {
        return (
            <div className='ltb-main'>
                {this.state.isLiked?
                    <div className="ltb-box" onClick={this.handleDislike}>
                        <img 
                            height="20px" 
                            width="20px" 
                            className="ccc-like-btn" 
                            src="/media/images/fill-heart.png" 
                            alt="fill-heart"
                        />
                        <p>{this.state.likes}</p>
                    </div>
                :
                    <div className="ltb-box" onClick={this.handleLike}>
                        <img 
                            height="20px" 
                            width="20px" 
                            src="/media/images/empty-heart.png" 
                            style={{opacity: '0.9'}}
                            alt="empty-heart"
                        />
                        <p>{this.state.likes}</p>
                    </div>
                }
            </div>
        )
    }
}

export default LikeTrackButton
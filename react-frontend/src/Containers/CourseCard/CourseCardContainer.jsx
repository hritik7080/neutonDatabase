import axios from 'axios'
import React, { Component } from 'react'
import "./CourseCardContainer.css"
export class CourseCardContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            isLiked: false,
            isClicked: false,
            isExpand: false,
            likes: this.props.data.likes

        }
        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
        this.showAvatar = this.showAvatar.bind(this)
        this.showType = this.showType.bind(this)
        this.openLink = this.openLink.bind(this)
        this.setDefaultPoster = this.setDefaultPoster.bind(this)
    }
    setDefaultPoster(e){
        e.target.src = '/media/images/default-poster.png'
    }
    showAvatar(){
        switch (this.props.data.avatar) {
            case 'a1':
                return <img src="/media/images/avatar-1.jpg" alt="avatar"/>
            case 'a2':
                return <img src="/media/images/avatar-2.jpg" alt="avatar"/>
            case 'a3':
                return <img src="/media/images/avatar-3.jpg" alt="avatar"/>
            case 'a4':
                return <img src="/media/images/avatar-4.jpg" alt="avatar"/>
            case 'a5':
                return <img src="/media/images/avatar-5.jpg" alt="avatar"/>
            case 'a6':
                return <img src="/media/images/avatar-6.jpg" alt="avatar"/>
            case 'a7':
                return <img src="/media/images/avatar-7.jpg" alt="avatar"/>
            case 'a8':
                return <img src="/media/images/avatar-8.jpg" alt="avatar"/>    
            default:
                return  <img src="/media/images/avatar-1.jpg" alt="avatar"/>
        }
    }
    showType(){
        switch (this.props.data.type) {
            case "1":
                return 'Course'
            case "2":
                return 'Article'
            case "3":
                return 'Book'
            case "4":
                return 'Project'
            default:
                return 'All'
        }
    }
    async handleLike(){
        this.setState({isLiked:true})
        try {
            await axios.get('/resourceAction/',{params: {id: this.props.data.id, action: 'like'}})
            this.setState({likes: this.state.likes + 1})
        } catch (error) {
            this.setState({isLiked: false})
        }
    }
    async handleDislike(){
        this.setState({isLiked:false})
        try {
            await axios.get('/resourceAction/',{params: {id: this.props.data.id, action: 'dislike'}})
            this.setState({likes: this.state.likes - 1})
        } catch (error) {
            this.setState({isLiked: true})
        }
    }
    handleExpand(){
        this.setState({isExpand: !this.state.isExpand})
    }
    async openLink(){
        try {
            await axios.get('/resourceAction/',{params:{id:this.props.data.id, action: 'view'}})
        } catch (error) {
            console.log(error);
        }
        const win = window.open(this.props.data.link, '_blank')
        if (win != null) {
            win.focus();
        }
    }
    render() {
        return (
            <div className="ccc-main">
                <div className="ccc-head">
                    {this.showAvatar()}
                    <p>{this.props.data.username}</p>
                    {this.props.data.price <= 0?
                        <span>Free</span>
                    :
                        <span><sub>₹</sub><b>{this.props.data.price}</b></span>
                    }
                </div>
                <div className={this.state.isExpand?"ccc-body ccc-open":"ccc-body"} onClick={this.handleExpand}>
                {/* <iframe src="https://www.youtube.com/embed/XR7Ev14vUh8?modestbranding=1&autohide=1" ></iframe> */}
                    <img onError={this.setDefaultPoster} src={this.props.data.poster} alt="poster"/>
                </div>
                <div className="ccc-foot">
                    <h4>{this.props.data.title}</h4>
                    <p>{this.props.data.desc}</p>
                    <a href="!#">{this.state.likes} likes | {this.props.data.views} views</a>
                    {/* <p>Lorem ienetur corrupti mollitia suscipit neque quaerat hic aperiam? Molestiae, minima iusto eaque, culpa quod ea repellat eligendi laborum, similique aliquid provident voluptatum!</p> */}
                    <div>
                        <span>{this.showType()}</span>
                        {this.state.isLiked?
                            <img height="20px" className="ccc-like-btn" width="20px" onClick={this.handleDislike} src="/media/images/fill-heart.png" alt="fill-heart"/>
                        :
                            <img height="20px" width="20px" onClick={this.handleLike} src="/media/images/empty-heart.png" style={{opacity: '0.8'}} alt="empty-heart"/>
                        }
                        <button onClick={this.openLink}>Open</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseCardContainer

import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./AddCourseContainer.css"
import jwt from 'jwt-decode'
import axios from 'axios'

export class AddCourseContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            link: '',
            type: '1',
            diff: '1',
            title: '',
            price: '',
            CouDes: '',
            avatar: 'a1',
            errorMes: '',
            imageData: null,
            imageFile: null,
            isClicked: false,
            isSuccess: false,
            submitText: 'SUBMIT' 
        }
        this.fileInput = React.createRef()
        this.onLinkClick = this.onLinkClick.bind(this)
        this.onChangeAvatar = this.onChangeAvatar.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onUploadPoster = this.onUploadPoster.bind(this)
    }
    onLinkClick(e){
        this.setState({isClicked: !this.state.isClicked})
    }
    onChangeAvatar(e){
        this.setState({avatar: e.target.alt})
    }
    onChangeInput(e){
        this.setState({ [e.target.name] : e.target.value})
    }
    onChangeImage(e){
        if (e.target.files && e.target.files[0]) {
            this.setState({
                imageData: e.target.files[0],
                imageFile: URL.createObjectURL(e.target.files[0])
            });
        }
    }
    onUploadPoster(e){
        e.stopPropagation()
        this.fileInput.current.click()
    }
    async handleSubmit(e){
        e.preventDefault()
        console.log("[ADDING CONTENT]...");
        this.setState({submitText: 'SUBMITING...'})
        try {
            const token = jwt(this.props.userToken)
            var data = new FormData()
            data.append('poster', this.state.imageData, this.state.imageData.name)
            data.append('difficulty', this.state.diff)
            data.append('token', this.props.userToken)
            data.append('avatar', this.state.avatar)
            data.append('username', token.username)
            data.append('course', this.props.data)
            data.append('price', this.state.price)
            data.append('title', this.state.title)
            data.append('desc', this.state.CouDes)
            data.append('link', this.state.link)
            data.append('type', this.state.type)

            await axios.post('/resource/', data, {Headers: {'Content-Type': 'multipart/form-data'}})
            this.setState({submitText: 'SUBMITED!', isSuccess: true})
            setTimeout(() => {
                this.props.handleClose()
            }, 3000);
        } catch (error) {
            console.log(error);
            this.setState({submitText: 'SUBMIT', isSuccess: false})
        }
    }
    render() {
        const accMain={
            width: '98%',
            color: 'black',
            cursor: 'pointer',
            position: 'relative',
            background: 'white', 
            borderRadius: '10px',
        }
        const accMainH3={
            flex: '1 1 auto',
            color: 'blue',
            fontSize: '15px',
            margin: '0px',
            padding: '20px 20px 20px 15px'
        }
        const accMainSpan={
            top: '50%',
            right: '-12px',
            color: 'black',
            width: '28px',
            height: '28px',
            display: 'flex',
            borderRadius: '50%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'whitesmoke',
            transform: 'translateY(-50%)'
        }
        return (
            <div className="acc-main">
                {this.state.isClicked?
                    <form method="post" onSubmit={this.handleSubmit}>
                        <h3>Add Content</h3>
                        {/* <input type="text" placeholder="Username or Organization name" onChange={this.onChangeName} value={this.state.name} className="acc-title"/> */}
                        <div className="acc-img-box" onClick={this.onUploadPoster}>
                            {this.state.imageFile? <img src={this.state.imageFile} alt="poster"/>:null}
                            <span>Upload poster</span>
                            <input type="file" accept=".png, .jpg, .jpeg" ref={this.fileInput} name='fileInput' onChange={this.onChangeImage}/>
                        </div>
                        <select className="acc-dropdown" name='type' onChange={this.onChangeInput}>
                            <option value="1" defaultValue="selected">Course</option>
                            <option value="2">Article</option>
                            <option value="3">Books</option>
                            <option value="4">Project</option>
                        </select>
                        <select className="acc-dropdown" name='diff' onChange={this.onChangeInput}>
                            <option value="0" defaultValue="selected">Mixed difficulty</option>
                            <option value="1">Easy difficulty</option>
                            <option value="2">Hard difficulty</option>
                        </select>
                        <input type="url" name='link' placeholder="Content link*" onChange={this.onChangeInput} value={this.state.link} className="acc-link" required/>
                        <input type="number" name='price' placeholder="Price (₹)*" onChange={this.onChangeInput} value={this.state.price} className="acc-price" required/>
                        <input type="text" name='title' placeholder="Enter title*" onChange={this.onChangeInput} value={this.state.title} className="acc-title" required/>
                        <textarea className="acc-details" name='CouDes' placeholder="Course Description" onChange={this.onChangeInput} value={this.state.CouDes} required></textarea>
                        <div className="acc-btns">
                            <button type='reset' className="acc-cancel-btn" onClick={this.onLinkClick}>Cancel</button>
                            <button type='submit' className="acc-submit-btn">{this.state.submitText}</button>
                        </div>
                    </form>
                :
                    <div style={accMain}>
                        <p style={accMainH3} onClick={this.onLinkClick}>Advertise your <u>course</u>, <u>article</u>, <u>book</u> or <u>project</u> on this topic for free.</p>
                        <span style={accMainSpan} onClick={() => this.props.handleClose()}>X</span>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userToken: state.profile.userToken,
        isLogged: state.profile.isLogged
    }
}

export default connect(mapStateToProps, null)(AddCourseContainer)

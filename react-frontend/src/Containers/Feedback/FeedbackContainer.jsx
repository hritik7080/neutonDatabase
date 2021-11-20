import * as ACTIONS from "../../store/actions/actions"
import React, { Component } from 'react'
import { connect } from "react-redux"
import "./FeedbackContainer.css"
import jwt from 'jwt-decode'
import axios from "axios"
export class FeedbackContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            email: "",
            suggestion: "",
            feedback: "",
            isSuccess:false,
            message: null
        }
        this.onSend = this.onSend.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
        this.sendData= this.sendData.bind(this)
    }
    componentDidMount(){
        if(this.props.isFeedbacked){
            this.setState({message: "Thank you sooooooo much!"})
        }
        if(this.props.isLogged){
            const token = jwt(this.props.userToken)
            this.setState({email: token.email})
        }
    }
    onChangeInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async sendData(){
        const data = new FormData()
        data.append('email', this.state.email)
        data.append('feedback', this.state.feedback)
        data.append('suggestion', this.state.suggestion)
        try{
            await axios.post('/feedback/', data, {Headers: {'Content-Type': 'multipart/form-data'}})
            this.props.callFeedback()
            this.setState({
                email: "",
                suggestion: "",
                feedback: "",
                isSuccess: true,
                message: "Thank you sooooooo much!"
            })
        }catch(error){
            this.setState({
                message: "Try Again"
            })      
        }
    }
    onSend(event){
        event.preventDefault()
        if(this.state.feedback.length === 0){
            this.setState({
                message: "Oooops! Your missed writing feedback"
            })
        }else{
            this.sendData()
        }
    }

    render() {
        return (
            this.state.isSuccess || this.props.isFeedbacked?
            <div className="fbc-main">
                <div className="fbc-top">
                    <h3>Feedback</h3>
                    <p>{this.state.message}</p>
                </div>
            </div>        
            :
            <div className="fbc-main">
                <div className="fbc-top">
                    <h3>Feedback</h3>
                    <p>Please feedback to help us building awesome features for you.</p>
                </div>
                <form className="fbc-bottom" onSubmit={this.onSend} method="post">
                    {this.props.isLogged?null:
                    <input type="text"placeholder="Email address or Phone number" name='email' value={this.state.email} onChange={this.onChangeInput}/>
                    }
                    <textarea placeholder="Suggest track(optional)" name='suggestion' value={this.state.suggestion} onChange={this.onChangeInput}></textarea>
                    <textarea placeholder="Enter feedback" name='feedback' value={this.state.feedback} onChange={this.onChangeInput}></textarea>
                    {this.state.message
                        ?<div><p>{this.state.message}</p><br/></div>
                        :null
                    }
                    <button type="submit">Send</button>
                </form>
            </div>        
        )
    }
}

function mapStateToProps(state) {
    return{
        isFeedbacked: state.profile.isFeedbacked,
        userToken: state.profile.userToken,
        isLogged: state.profile.isLogged
    }
}

function mapDispatchToProps(dispatch) {
    return{
        callFeedback: () => dispatch(ACTIONS.feedback_success())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);

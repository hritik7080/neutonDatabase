import * as ACTIONS from "../../store/actions/actions"
import React, { Component } from 'react'
import { connect } from "react-redux"
import "./SubscribeContainer.css"
import axios from "axios"
export class SubscribeContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            isJoining: false,
            isLogining: false,
            submitting: "SUBMIT",
            fname: '',
            lname: '',
            profession: '',
            emailPhone: '',
            newUsername: '',
            newPassword: '',
            oldUsername: '',
            oldPassword: '',
            professionError:null,
            usernameError: null,
            emailphoneError: null,
            signupError: null,
            loginError: null
        }
        this.handleMenu = this.handleMenu.bind(this)
        this.handleJoining = this.handleJoining.bind(this)
        this.handleLogining = this.handleLogining.bind(this)

        this.onChangingFname = this.onChangingFname.bind(this)
        this.onChangingLname = this.onChangingLname.bind(this)
        this.onChangingProfession = this.onChangingProfession.bind(this)
        this.onChangingEmailPhone = this.onChangingEmailPhone.bind(this)
        this.onChangingNewUsername = this.onChangingNewUsername.bind(this)
        this.onChangingNewPassword = this.onChangingNewPassword.bind(this)
        this.onChangingOldUsername = this.onChangingOldUsername.bind(this)
        this.onChangingOldPassword = this.onChangingOldPassword.bind(this)

        this.onJoining = this.onJoining.bind(this)
        this.onLogining = this.onLogining.bind(this)
    }

    componentDidMount(){
        console.log(this.props.isLogged);
    }
    handleJoining(){
        this.setState({isJoining: true, isLogining: false})
    }
    handleLogining(){
        this.setState({isJoining: false, isLogining: true})
    }
    handleMenu(){
        this.setState({isJoining: false, isLogining: false})
    }
    onChangingFname(e){
        this.setState({fname: e.target.value})
    }
    onChangingLname(e){
        this.setState({lname: e.target.value})
    }
    onChangingProfession(e){
        this.setState({profession: e.target.value})
        if (e.target.value === "0"){
            this.setState({professionError: "Select the option."})
        }else{
            this.setState({professionError: null})
        }
    }
    async onChangingEmailPhone(e){
        // let token = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({emailPhone: e.target.value})
        try {
            await axios.get('/checkEmail/',{params: {email: e.target.value}})
            this.setState({emailphoneError: null})
        } catch (error) {
            this.setState({emailphoneError: 'Email address already exist.'})
            // if(token.test(e.target.value)){
            //     this.setState({emailphoneError: 'Email address already exist.'})
            // }else{
            //     this.setState({emailphoneError: 'Phone number already exist.'})
            // }
        }
    }
    async onChangingNewUsername(e){
        this.setState({newUsername: e.target.value})
        try {
            await axios.get('/checkUsername/',{params: {username: e.target.value}})
            this.setState({usernameError: null})
        } catch (error) {
            this.setState({usernameError: 'Username already exist.'})
        }
    }
    onChangingNewPassword(e){
        this.setState({newPassword: e.target.value})
        if (e.target.value.length === 0){
            this.setState({signupError: "No password, Enter password."})
        }else if(e.target.value.length < 8){
            this.setState({signupError: "less then 8 character is not allowed."})
        }else{
            this.setState({signupError: null})
        }
    }
    async onJoining(e){
        e.preventDefault()
        console.log("[JOINING]...");
        this.setState({submitting: 'SUBMITING...'})
        try {
            const signupData = new FormData()
            signupData.append('username', this.state.newUsername)
            signupData.append('first_name', this.state.fname)
            signupData.append('last_name', this.state.lname)
            signupData.append('email', this.state.emailPhone)
            signupData.append('password', this.state.newPassword)
            signupData.append('profession', this.state.profession)
            const res = await axios.post('/auth/register/',signupData, {Headers: {'Content-Type': 'multipart/form-data'}})
            this.setState({submitting: 'YOU ARE REGISTERED', oldUsername: res.data.username})
            setTimeout(() => {
                this.setState({isLogining: true, isJoining: false, submitting: 'SUBMIT'})
            }, 2000);
        } catch (error) {
            this.setState({submitting: 'SUBMIT', signupError: "Enter a valid information or Internet connection error"})
        }
    }

    // LOGIN functions
    onChangingOldUsername(e){
        this.setState({oldUsername: e.target.value})
    }
    onChangingOldPassword(e){
        this.setState({oldPassword: e.target.value})
    }
    async onLogining(e){
        e.preventDefault()
        console.log("[LOGINING]...");
        this.setState({submitting: 'LOGGING...'})
        try {
            const data = new FormData()
            data.append('username', this.state.oldUsername)
            data.append('password', this.state.oldPassword)
            const res = await axios.post('/auth/login/',data, {Headers: {'Content-Type': 'multipart/form-data'}})
            console.log(res.data);
            this.props.login_success(res.data)
            this.props.onLoginSuccess()
        } catch (error) {
            console.log(error);
            this.setState({submitting: 'SUBMIT', loginError: "Enter a correct username and password."})
        }
    }
    render() {
        return (
            <div className="sc-main">
                {!this.state.isJoining && !this.state.isLogining?
                    <div className="sc-box-1">
                        <div className="sc-head">
                            <h2>Take your first step to start your career</h2>
                            <p>Get the discount on thousand of content and get notification of awesome new feature.</p>
                        </div>
                        <div className="sc-body">
                            <button onClick={this.handleJoining} type="submit">JOIN US</button>
                        </div>
                        {/* <h6>OR</h6> */}
                        <hr/>
                        <div className="sc-foot">
                            <button onClick={this.handleLogining}>LOGIN</button>
                        </div>
                    </div>
                :null
                }
                {this.state.isJoining?
                    <div className="sc-box-2">
                        <div className="sc-box-2-head">
                            <span onClick={this.handleMenu}>
                                <img height="18px" width="18px" src="/media/images/black-left-arrow.png" alt="left-arrow"/>
                            </span>
                            <h3>JOIN US</h3>
                        </div>
                        <form onSubmit={this.onJoining} className="sc-box-2-body">
                            <select onChange={this.onChangingProfession}>
                                <option value="0">Who are you?</option>
                                <option value="student">I am Student</option>
                                <option value="professional">I am Professional</option>
                                <option value="organization">I am Organization</option>
                            </select>
                            {this.state.professionError? <p>{this.state.professionError}</p>: null}
                            <span>
                                <input type="text" placeholder="First name" onChange={this.onChangingFname} value={this.state.fname} required/>
                                <input type="text" placeholder="Last name" onChange={this.onChangingLname} value={this.state.lname} required/>
                            </span>
                            <input type="text" placeholder="Username" onChange={this.onChangingNewUsername} value={this.state.newUsername} required/>
                            {this.state.usernameError? <p>{this.state.usernameError}</p>: null}
                            <input type="email" placeholder="Email address" onChange={this.onChangingEmailPhone} value={this.state.emailPhone} required/>
                            {this.state.emailphoneError? <p>{this.state.emailphoneError}</p>: null}
                            <input type="password" placeholder="Password" onChange={this.onChangingNewPassword} value={this.state.newPassword} required/>
                            {this.state.signupError? <p>{this.state.signupError}</p>: null}
                            <button type="submit"> {this.state.submitting} </button>
                        </form>
                        <div className="sc-box-2-foot"></div>
                    </div>
                :null}
                {this.state.isLogining?
                    <div className="sc-box-2">
                        <div className="sc-box-2-head">
                            <span onClick={this.handleMenu}>
                                <img height="18px" width="18px" src="/media/images/black-left-arrow.png" alt="left-arrow"/>
                            </span>
                            <h3>LOGIN</h3>
                        </div>
                        <form onSubmit={this.onLogining} className="sc-box-2-body">
                            <input type="text" placeholder="Username" onChange={this.onChangingOldUsername} value={this.state.oldUsername} required/>
                            <input type="password" placeholder="Password" onChange={this.onChangingOldPassword} value={this.state.oldPassword} required/>
                            {this.state.loginError? <p>{this.state.loginError}</p>: null}
                            <button type="submit">{this.state.submitting}</button>
                        </form>
                        <div className="sc-box-2-foot"></div>
                    </div>
                :null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isLogged: state.profile.isLogged
    }
}

function mapDispatchToProps(dispatch) {
    return{
        login_success: (text) => dispatch(ACTIONS.login_success(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeContainer)
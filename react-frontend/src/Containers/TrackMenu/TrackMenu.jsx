import * as ACTIONS from "../../store/actions/actions"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwt from 'jwt-decode'
import "./TrackMenu.css"
class TrackMenu extends Component {
    constructor(props){
        super(props)
        this.state={
            isMenuOpen: false,
            userData: {}
        }
        this.handleExpandMenu = this.handleExpandMenu.bind(this)
        this.onLogout = this.onLogout.bind(this)
    }
    componentDidMount(){
        if(this.props.isLogged){
            this.setState({userData: jwt(this.props.userToken)})
        }
        if(window.innerWidth > 700){
            this.setState({isMenuOpen: true})
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.isLogged && prevProps.isLogged !== this.props.isLogged){
            this.setState({userData: jwt(this.props.userToken)})
        }
    }
    handleExpandMenu(e){
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    }
    onLogout(e){
        e.stopPropagation()
        this.props.logout_success()
    }
    render() {
        return (
            <div className="tm-main">
                <div className="tm-head">   
                    <p translate="no">NEUTON</p>
                    {this.props.isLogged && this.props.userToken?
                        <button 
                        onClick={this.handleExpandMenu} 
                        class={
                            this.state.isMenuOpen?
                            "tm-head-btn tm-head-btn-active": 
                            "tm-head-btn"
                        }></button>
                    :
                    null
                    }
                </div>
                {this.props.isLogged && this.props.userToken && this.state.isMenuOpen?
                    <div className="tm-body">
                        <div className="tm-body-top">
                            <button>Go back</button>
                            <button>Track</button>
                        </div>
                        <div className="tm-body-bottom">
                            <p>{this.state.userData.first_name} {this.state.userData.last_name}</p>
                            <span>@{this.state.userData.username}</span>
                            <button onClick={this.onLogout}>Log out</button>
                        </div>
                    </div>
                :
                    null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isLogged: state.profile.isLogged,
        userToken: state.profile.userToken
    }
}

function mapDispatchToProps(dispatch) {
    return{
        login_success: (text) => dispatch(ACTIONS.login_success(text)),
        logout_success: () => dispatch(ACTIONS.logout_success())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackMenu)

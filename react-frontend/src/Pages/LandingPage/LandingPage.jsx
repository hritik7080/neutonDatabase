// import { Helmet } from "react-helmet-async";
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {Helmet} from "react-helmet"
import history from "../../utils/history";
// import * as ACTIONS from "../../store/actions/actions";
import HeaderContainer from '../../Containers/Header/HeaderContainer'
import SubscribeContainer from '../../Containers/Subscribe/SubscribeContainer'
import "./LandingPage.css"

class LandingPage extends Component {
    constructor(props){
        super(props)
        this.section1 = React.createRef()
        this.section2 = React.createRef()
        this.section3 = React.createRef()
        this.section4 = React.createRef()
        this.handleOnClick =this.handleOnClick.bind(this)
        this.onLoginSuccess = this.onLoginSuccess.bind(this)
    }
    componentDidMount(){
        if(this.props.isLogged){
            history.push('/track')
        }
    }
    componentDidUpdate(){
        if(this.props.isLogged){
            history.push('/track')
        }
    }
    onLoginSuccess(){
        history.push('/track')
    }
    handleOnClick = (id) => {
        //.current is verification that your element has rendered
        switch (id) {
            case 1:
                this.section1.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                 })   
                break;
            case 2:
                this.section2.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                 })    
                break;
            case 3:
                this.section3.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                 })    
                break;
            case 4:
                this.section4.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                 })    
                break;
            default:
                this.section1.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                })
                break;
        }
    }
    render() {
        return (
            <div className="lp-main" onScroll={this.handleScroll}>
                <Helmet>
                    {/* Primary Meta Tags */}
                    <title>NEUTON</title>
                    <meta charset="utf-8" />
                    <meta name="title" content="NEUTON"/>
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Explore a new career path or Learning anything to everything using advance learning roadmap like Explorer. Find the best learning path and courses to acquire a skill in a smarter way"/>
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://neuton.space/"/>
                    <meta property="og:title" content="NEUTON"/>
                    <meta property="og:description" content="Explore a new career path or Learning anything to everything using advance learning roadmap like Explorer. Find the best learning path and courses to acquire a skill in a smarter way"/>
                    <meta property="og:image" content="/logo192.png"/>
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://neuton.space/"/>
                    <meta property="twitter:title" content="NEUTON"/>
                    <meta property="twitter:description" content="Explore a new career path or Learning anything to everything using advance learning roadmap like Explorer. Find the best learning path and courses to acquire a skill in a smarter way"/>
                    <meta property="twitter:image" content="/logo192.png"/>
                </Helmet>
                <div className="section-1" ref={this.section1}>
                    <div className="section-1-left">
                        <h1>Find the best learning path</h1>
                        <h3>Explore a new career path or Learning 
                            anything to everything using advance 
                            learning roadmap like <b>Explorer</b>.</h3>
                        <Link to="/track">FIND ROADMAP</Link>
                    </div>
                    <div className="section-1-right">
                        <SubscribeContainer onLoginSuccess={this.onLoginSuccess}/>
                    </div>
                </div>
                <div className="lp-header">
                    <HeaderContainer onButtonClick={this.handleOnClick} />
                </div>
                <div className="section-2" ref={this.section2}>
                    <div className="lp-sl">
                        <h1>WHY</h1>
                        <h3>The purpose of neuton is to provide career 
                            guidance to the enthusiastic learners, 
                            lacking in guidance or feel stuck in their 
                            career. The tracks are designed 
                            in an organised manner by the industry experts 
                            to bring out the inner capabilities of students 
                            who are lacking in the proper guidance.
                        </h3>
                    </div>
                    <img src="./media/images/why-1.jpg" alt=""/>
                </div>
                <div className="section-3" ref={this.section3}>
                    <div className="lp-sl">
                        <h1>HOW</h1>
                        <h3>Neuton is determined for its learning 
                            family and our main objective to provide a 
                            quality learning path with multiple content 
                            across diferent areas. Once it's learning 
                            family grows to a certain extent, we will 
                            upgrade this platform so that all the users 
                            across the nation can get connected to each 
                            other directly and achieve the maximum amount 
                            of exposure possible.
                        </h3>
                    </div>
                    <img src="./media/images/how.jpg" alt="images"/>
                </div>
                <div className="section-4" ref={this.section4}>
                    <h1>TEAM</h1>
                    <div className="lp-card-box">
                        <img src="./media/images/person.jpg" alt="avatar"/>
                        <div className="lp-card-details">
                            <h4><b>Satyam Sharma</b></h4>
                            <p>Frontend Engineer</p> 
                        </div>
                        <a href="https://www.linkedin.com/in/satyamskillz/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <div className="lp-card-box">
                        <img src="./media/images/hritik.jpeg" alt="avatar"/>
                        <div className="lp-card-details">
                            <h4><b>Hritik Gupta</b></h4>
                            <p>Backend Engineer</p> 
                        </div>
                        <a href="https://www.linkedin.com/in/hritik7080/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <div className="lp-card-box">
                        <img src="./media/images/Anubhav.jpeg" alt="avatar"/>
                        <div className="lp-card-details">
                            <h4><b>Abhinav Dubey</b></h4>
                            <p>DevOps Engineer</p> 
                        </div>
                        <a href="https://www.linkedin.com/in/abhinavdubey26/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <div className="section-5">@ Neuton Space</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isLogged: state.profile.isLogged,
        userData: state.profile.userData,
        userToken: state.profile.userToken
    }
}

export default connect(mapStateToProps, null)(LandingPage)

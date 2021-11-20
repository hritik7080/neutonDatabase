import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// var QRCode = require('qrcode.react');
import QRCode from "qrcode.react";
import './ProfileCard.css'
import { connect } from 'react-redux';
import axios from 'axios';

class ProfileCard extends Component {
    constructor(props){
        super(props)
        this.state={
            copyCode: null,
            isSharing: false,
            isMenuOpen: false,
            isCopySuccess: false,
            username: this.props.match.params.username
        }
        this.openOptionMenu = this.openOptionMenu.bind(this)
        this.openShareComp = this.openShareComp.bind(this)
        this.copyToClipboard = this.copyToClipboard.bind(this)
    }
    openOptionMenu(){
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    }
    openShareComp(){
        this.setState({isSharing: !this.state.isSharing})
    }
    async copyToClipboard(text, code){
        console.log(text, code);
        try {
            await navigator.clipboard.writeText(text);
            this.setState({isCopySuccess: true, copyCode: code})
            setTimeout(() => {
                this.setState({isCopySuccess: false, copyCode: null})
            }, 10000);
        } catch (error) {
            this.setState({isCopySuccess: false})
        }
    }
    componentDidMount(){
        const getUserdetails = async () => {
            const res = await axios.get('/userDetails/', {params: {token: this.props.userToken}})
            console.log(res.data);
        }
        console.log(this.props.userToken);
        getUserdetails()
    }
    render(){
        return (
            <div className='pc-main'>
                {/* <div className="pc-header">
                    <p>NEUTON</p>
                </div> */}
                <div className="pc-box">
                    <div className="pc-box-1">
                        <img src="/media/images/satyam.jpg" alt="Profile"/>
                    </div>
                    {this.state.isSharing?
                    <div className="pc-box-2">
                        <div className="pc-box-2-head">
                            <div className="pc-box-2-head-main">
                                <p>Share Profile</p>
                                <span>Click to copy</span>
                            </div>
                            <div className="pc-opt-box">
                                <button onClick={this.openShareComp}>
                                    <img src="/media/images/close-menu.svg" alt="close"/>
                                </button>
                            </div>
                        </div>
                        <div className="pc-box-2-body">
                            <div className="pc-qrcode-box">
                                <QRCode
                                    size="200"
                                    value={window.location.href}
                                    includeMargin={true} 
                                />
                            </div>
                        </div>
                        <div className="pc-box-2-foot">
                            <div onClick={() => this.copyToClipboard(window.location.href, 1)} className="pc-email">
                                <img width="24px" height="24px" src="/media/images/copy-icon.png" alt="copy"/>
                                <p>{window.location.href}</p>
                                {this.state.isCopySuccess && this.state.copyCode === 1?
                                    <img width="24px" height="24px" src="/media/images/checkmark-icon.png" alt="checkmark"/>
                                :null}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="pc-box-2">
                        <div className="pc-box-2-head">
                            <div className="pc-box-2-head-main">
                                <p>Satyam Sharma</p>
                                <span>@{this.state.username}</span>    
                            </div>
                            <div className="pc-opt-box">
                                <button onClick={this.openOptionMenu}>
                                    <img src={this.state.isMenuOpen? "/media/images/close-menu.svg" : "/media/images/menu-vertical.png"} alt=""/>
                                </button>
                                {this.state.isMenuOpen?
                                    <div className="pc-opt-menu">
                                        <Link className="pc-opt-menu-list">
                                            Edit
                                        </Link>
                                        <Link className="pc-opt-menu-list">
                                            Setting
                                        </Link>
                                        <Link className="pc-opt-menu-list">
                                            Report
                                        </Link>
                                    </div>
                                :
                                    null
                                }
                            </div>
                        </div>
                        <div className="pc-box-2-body">
                            <div className="pc-social">
                                <Link className="pc-social-item">
                                    <img width="32px" height="32px" src="/media/images/custom-website.png" alt="website"/>
                                </Link>
                                <Link className="pc-social-item">
                                    <img width="32px" height="32px" src="/media/images/youtube.svg" alt="youtube"/>
                                </Link>
                                <Link className="pc-social-item">
                                    <img width="32px" height="32px" src="/media/images/telegram.svg" alt="telegram"/>
                                </Link>
                                <Link className="pc-social-item">
                                    <img width="32px" height="32px" src="/media/images/discord.svg" alt="discord"/>
                                </Link>
                            </div>
                            <div className="pc-bio">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quasi, excepturi assumenda veniam esse quidem repellendus sint, praesentium ab voluptatum similique consectetur eos pariatur ducimus qui. At molestias repudiandae rerum.</p>
                            </div>
                            <div onClick={() => this.copyToClipboard('satyamskillz@gmail.com', 2)} className="pc-email">
                                <img width="24px" height="24px" src="/media/images/gmail.png" alt="gmail"/>
                                <p>Satyamskillz@gmail.com</p>
                                {this.state.isCopySuccess && this.state.copyCode === 2?
                                    <img width="24px" height="24px" src="./media/images/checkmark-icon.png" alt="checkmark"/>
                                :null}
                            </div>
                            <div onClick={() => this.copyToClipboard('+919918925425', 3)} className="pc-phone">
                                <img width="24px" height="24px" src="/media/images/phone.png" alt="phone"/>
                                <p>+919918925425</p>
                                {this.state.isCopySuccess && this.state.copyCode === 3?
                                    <img width="24px" height="24px" src="/media/images/checkmark-icon.png" alt="checkmark"/>
                                :null}
                            </div>
                            <div className="pc-location">
                                <img width="24px" height="24px" src="/media/images/google-maps.svg" alt="pin"/>
                                <p style={{ textTransform: 'capitalize'}} >allahabad, india</p>
                            </div>
                        </div>
                        <div className="pc-box-2-foot">
                            <div className="pc-bond">
                                <p>123 Bonds</p>
                            </div>
                            <div className="pc-btns">
                                <button onClick={this.openShareComp} className="pc-share-btn">Share</button>
                                <button className="pc-bond-btn">BOND</button>
                            </div>
                        </div>
                    </div>
                    }
                    <Link to='/' className="pc-logo">
                        <img width="48px" height="48px" src="/media/logo192.png" alt="logo"/>
                    </Link>
                </div>
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

export default connect(mapStateToProps, null)(ProfileCard)

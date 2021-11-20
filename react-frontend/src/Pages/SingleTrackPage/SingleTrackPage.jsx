import React, { Component } from 'react'
import FeedbackContainer from '../../Containers/Feedback/FeedbackContainer'
import TrackMenu from '../../Containers/TrackMenu/TrackMenu'
import "./SingleTrackPage.css"
import axios from "axios";
import TrackContainer from '../../Containers/Track/TrackContainer';
import LoadingBox from '../../Functions/LoadingBox/LoadingBox';
// import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
export class SingleTrackPage extends Component {
    constructor(props){
        super(props)
        this.state={
            trackData: [],
            gotoHeight: 0,
            isLoading: true,
            screenHeight: window.innerHeight
        }
        this.stpTop = React.createRef()
        this.goToTop = React.createRef()
        this.OnGotoTop =this.OnGotoTop.bind(this)
    }
    componentDidMount(){
        axios.get('/getTrack/',{params: {id: this.props.match.params.id}})
        .then((res) => this.setState({trackData: res.data, isLoading: false}))
        .catch((err) => console.log(err))
    }
    OnGotoTop(event){
        this.stpTop.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"
         })
    }
    render() {
        return (
            this.state.isLoading?
                <div className="page-loader">
                    <Helmet>
                        {/* Page sittings */}
                        <meta charset="utf-8" />
                        <meta name="theme-color" content="#000000" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        
                        {/* Primary Meta Tags */}
                        <title>Loading...</title>
                    </Helmet>
                    <h1>NEUTON</h1>
                    <Link to={'/track'}>
                        <button>Go back</button>
                    </Link>
                </div>
            :
            <div className="stp-main">
                <Helmet>
                    {/* Page sittings */}
                    <meta charset="utf-8" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    
                    {/* Primary Meta Tags */}
                    <title>{this.state.trackData.title}</title>
                    <meta name="title" content={this.state.trackData.title}/>
                    <meta name="description" content={this.state.trackData.desc}/>
                    
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://neuton.space/"/>
                    <meta property="og:title" content={this.state.trackData.title}/>
                    <meta property="og:description" content={this.state.trackData.desc}/>
                    <meta property="og:image" content="/logo192.png"/>
                    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://neuton.space/"/>
                    <meta property="twitter:title" content={this.state.trackData.title}/>
                    <meta property="twitter:description" content={this.state.trackData.desc}/>
                    <meta property="twitter:image" content="/logo192.png"/>
                </Helmet>
                <div className="stp-head">
                    <TrackMenu />
                </div>
                <div className="stp-body">
                    <div className="stp-body-1" ref={this.stpTop}>
                        {!this.state.isLoading?
                            <div>
                                <TrackContainer data={this.state.trackData} />
                            </div>
                        :
                            <LoadingBox/>
                        }
                    </div>
                    <div className="stp-body-2">
                        <FeedbackContainer />
                        <div className="footer">
                            <p>@NeutonSpace</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleTrackPage
